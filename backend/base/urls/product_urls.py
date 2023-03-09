from django.urls import path

from base.views import producrs_views as views

urlpatterns = [

    path('', views.getProducts, name='prodcts'),

    path('create/', views.createProduct, name='create-product'),

    path('upload/', views.uploadImage, name='image-upload'),

    path('<str:pk>/reviews/', views.createProductReview, name='prodcut-review'),
    path('top/', views.getTopProduct, name='top-product'),

    path('<str:pk>', views.getProduct, name='prodcut'),

    path('deleteproduct/<str:pk>', views.deleteProduct, name='delete-product'),

    path('updateproduct/<str:pk>', views.updateProduct, name='product-update'),


]
