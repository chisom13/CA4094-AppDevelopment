from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class APIUser(AbstractUser):
    pass


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500, null=False)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    description = models.TextField(max_length=400)
    PRODUCT1 = 'NIKE'
    PRODUCT2 = 'JORDAN'
    PRODUCT3 = 'ADIDAS'
    PRODUCT4 = 'CONVERSE'
    PRODUCT_TYPE = [
        (PRODUCT1, 'Nike'),
        (PRODUCT2, 'Jordan'),
        (PRODUCT3, 'Adidas'),
        (PRODUCT4, 'Converse'),
    ]
    type = models.CharField(max_length=8, choices=PRODUCT_TYPE, default=PRODUCT1)
    sku = models.CharField(max_length=15, null=False)
    release_date = models.DateField(auto_now_add=True)
    silhouette = models.CharField(max_length=25)
    product_image = models.ImageField(upload_to='products', default='prod-placeholder.png', blank=True)
    product_image2 = models.ImageField(upload_to='products', default='prod-placeholder.png', blank=True)
    product_image3 = models.ImageField(upload_to='products', default='prod-placeholder.png', blank=True)
    product_image4 = models.ImageField(upload_to='products', default='prod-placeholder.png', blank=True)


class Basket(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    datetime = models.DateTimeField(auto_now_add=True)


class BasketItems(models.Model):
    id = models.AutoField(primary_key=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE, null=True, blank=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    datetime = models.DateTimeField(auto_now_add=True)

    def sub_price(self):
        return self.product_id.price * self.quantity

    def product_name(self):
        return self.product_id.name

    def image(self):
        image_src = "http://localhost:8000/media/" + str(self.product_id.product_image)
        return image_src

    def price(self):
        return self.product_id.price


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)

