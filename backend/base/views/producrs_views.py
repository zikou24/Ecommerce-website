from django.shortcuts import render
# Create your views here.
from rest_framework.decorators import api_view

from rest_framework.response import Response

from base.models import Product, Review

from base.serializers import ProductSerializers
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.db.models import Q


@api_view(['GET'])
def getProducts(request):

    query = request.query_params.get('keyword')

    print({'query': query})

    if query == None:
        query = ''

    product = Product.objects.filter(Q(name__icontains=query))

    serializers = ProductSerializers(product, many=True)

    return Response(serializers.data)


@api_view(['GET'])
def getProduct(request, pk):

    product = Product.objects.get(_id=pk)

    serializers = ProductSerializers(product, many=False)

    return Response(serializers.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):

    user = request.user

    product = Product.objects.create(

        user=user,
        name='Kitman',
        price=0,

        brand='Sample Brand',
        countInStock=0,
        category='Kitman category',
        description=''

    )

    serializers = ProductSerializers(product, many=False)

    return Response(serializers.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):

    productForDelete = Product.objects.get(_id=pk)

    productForDelete.delete()

    return Response('Product Is deleting')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):

    product = Product.objects.get(_id=pk)

    data = request.data

    product.name = data['name']
    product.image = data['image']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.price = data['price']
    product.countInStock = data['countInStock']

    product.save()

    serializer = ProductSerializers(product, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):

    data = request.data

    product_id = data['product_id']

    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')

    product.save()

    return Response('image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data
    alreadyExist = product.review_set.filter(user=user).exists()
    if alreadyExist:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:

        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']

        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total/len(reviews)
        product.save()
        return Response('Review Added')
