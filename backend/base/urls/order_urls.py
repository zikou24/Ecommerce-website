from django.urls import path

from base.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name='orders'),

    path('myorders/', views.getMyOrders, name='orders-profile'),

    path('add/', views.addOrderItems, name='order-add'),

    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.getOrderById, name='user-order'),




]
