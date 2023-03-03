import email
from urllib import response
from django.shortcuts import render
# Create your views here.
from django.http import JsonResponse


from django.contrib.auth.models import User


from rest_framework.decorators import api_view

from rest_framework.response import Response


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.serializers import UserSerializers, UserSerializerWithToken
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser


from django.contrib.auth.hashers import make_password

from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):

    data = request.data

    try:

        user = User.objects.create(

            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])

        )

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)

    except:

        message = {'detail': 'User With email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfil(request):

    user = request.user
    serializers = UserSerializerWithToken(user, many=False)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':

        user.password = make_password(data['password'])

    user.save()

    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfil(request):

    user = request.user
    serializers = UserSerializers(user, many=False)
    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):

    users = User.objects.all()

    serializers = UserSerializers(users, many=True)

    return Response(serializers.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):

    userForDelete = User.objects.get(id=pk)

    userForDelete.delete()

    return Response('User Is deleting')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):

    user = User.objects.get(id=pk)

    serializers = UserSerializers(user, many=False)

    return Response(serializers.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):

    user = User.objects.get(id=pk)
    
    data = request.data

    user.first_name = data['name']

    user.username = data['email']

    user.email = data['email']

    user.is_staff = data['isAdmin']

    user.save()

    serializers = UserSerializers(user, many=False)

    return Response(serializers.data)
