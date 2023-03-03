from cgitb import text
from django.shortcuts import render, get_object_or_404


from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializers, OrderSerializers, OrderItemSerializers
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status


@api_view(['POST'])
def addOrderItems(request):

    user = request.user
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:

        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        # create Order
        order = Order.objects.create(

            user=user,
            payementMethod=data['payementMethod'],
            textPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']

        )

        # createShippingAdress
        shipping = ShippingAddress.objects.create(

            order=order,
            address=data['shippingAdress']['adress'],
            city=data['shippingAdress']['city'],
            postalCode=data['shippingAdress']['postal'],
            country=data['shippingAdress']['country']


        )

        # create Order Items

        for i in orderItems:
            product = get_object_or_404(Product, _id=i['product'])

            item = OrderItem.objects.create(

                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,

            )

            # updateStock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderItemSerializers(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):

   # orders = OrderItem.objects.all()

    ordersss = Order.objects.all()

    serializer = OrderSerializers(ordersss, many=True)

    return Response(serializer.data)
