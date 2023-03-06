from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, ShippingAddress, Order, OrderItem, Review


class UserSerializers(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)

    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:

        model = User

        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):

        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializers):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:

        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):

        token = RefreshToken.for_user(obj)

        return str(token.access_token)


class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializers(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):

            reviewss = obj.review_set.all()

            serializer = ReviewSerializers(reviewss, many=True)

            return serializer.data
        


class ShippinAdressSerializers(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializers(serializers.ModelSerializer):

    orderItems = serializers.SerializerMethodField(read_only=True)

    shippingAddress = serializers.SerializerMethodField(read_only=True)

    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializers(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):

        try:
            shippingAddress = ShippinAdressSerializers(
                obj.shippingaddress, many=False).data

        except:
            shippingAddress = False
        return shippingAddress

    def get_user(self, obj):

        user = obj.user

        serializer = UserSerializers(user, many=False)

        return serializer.data
