from django.shortcuts import render
# Create your views here.
from rest_framework.decorators import api_view

from rest_framework.response import Response

from base.models import Product

from base.serializers import ProductSerializers
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status


@api_view(['GET'])
def getProducts(request):

    product = Product.objects.all()

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
