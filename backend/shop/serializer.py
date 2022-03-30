from rest_framework import serializers
from .models import *



class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'type', 'product_image', 'sku', 'release_date', 'silhouette', 'product_image2', 'product_image3', 'product_image4']


class BasketItemsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BasketItems
        fields = ['product_id', 'product_name', 'quantity', 'sub_price', 'image', 'price']


class BasketSerializer(serializers.HyperlinkedModelSerializer):
    items = BasketItemsSerializer(many=True, read_only=True, source='basketitems_set')

    class Meta:
        model = Basket
        fields = ['id', 'user_id', 'is_active', 'items']


class AddBasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItems
        fields = ['product_id']

    def create(self, validated_data):
        product_id = validated_data['product_id']
        request = self.context.get('request', None)
        if request:
            current_user = request.user
            shopping_basket = Basket.objects.filter(user_id=current_user, is_active=True).first()
            # Check if the item is already in the basket
            basket_items = BasketItems.objects.filter(basket_id=shopping_basket, product_id=product_id).first()
            print(shopping_basket)
            if basket_items:
                print('Its adding')
                basket_items.quantity = basket_items.quantity + 1  # if it is already in the basket, add to the quantity
                basket_items.save()
                return basket_items
            else:
                print('its going through')
                new_basket_item = BasketItems.objects.create(basket_id=shopping_basket, product_id=product_id)
                new_basket_item.save()
                return new_basket_item

        else:
            return None


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    basket = BasketSerializer(many=True, read_only=True, source='basket_set')

    class Meta:
        model = Order
        fields = ['id', 'basket_id', 'date_ordered', 'user_id', 'basket', 'total_price']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['id', 'username', 'email', 'password']


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        username = validated_data['username']
        passsword = validated_data['password']  # Extract the username, email and passwor from the serializer
        new_user = APIUser.objects.create_user(username=username,
                                               email=email, password=passsword)  # Create a new APIUser
        new_user.save()  # Save the new user
        new_basket = Basket.objects.create(user_id=new_user)  # Create a shopping basket
        new_basket.save()  # save the shopping basket
        return new_user


class RemoveBasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItems
        fields = ['product_id']

    def create(self, validated_data):
        product_id = validated_data['product_id']
        request = self.context.get('request', None)
        if request:
            current_user = request.user
            shopping_basket = Basket.objects.filter(user_id=current_user, is_active=True).first()
            # Check if the item is already in the basket
            basket_items = BasketItems.objects.filter(product_id=product_id).first()
            if basket_items:
                if basket_items.quantity > 1:
                    basket_items.quantity = basket_items.quantity - 1  # if it is already in the basket, add to the quantity
                    basket_items.save()
                    return basket_items
                else:
                    basket_items.delete()
                    return BasketItems.objects.create(basket_id=shopping_basket, product_id=product_id, quantity=0)
            else:
                return BasketItems.objects.create(basket_id=shopping_basket, product_id=product_id, quantity=0)
        else:
            return None


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['basket_id', 'total_price']

    def create(self, validated_data):
        request = self.context.get('request', None)
        current_user = request.user
        total_price = validated_data['total_price']
        basket_id = validated_data['basket_id']
        # get the sopping basket
        # mark as inactive
        basket_id.is_active = False
        basket_id.save()
        # create a new order
        order = Order.objects.create(basket_id=basket_id, user_id=current_user, total_price=total_price)
        order.save()
        # create a new empty basket for the customer
        new_basket = Basket.objects.create(user_id=current_user)  # Create a shopping basket
        new_basket.save()
        # return the order
        return order
