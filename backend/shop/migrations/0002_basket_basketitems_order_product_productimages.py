# Generated by Django 3.2.7 on 2021-12-14 15:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Basket',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('is_active', models.BooleanField(default=True)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProductImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image1', models.ImageField(blank=True, default='prod-placeholder.png', upload_to='products')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=500)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('description', models.TextField(max_length=400)),
                ('type', models.CharField(choices=[('NIKE', 'Nike'), ('JORDAN', 'Jordan'), ('ADIDAS', 'Adidas'), ('CONVERSE', 'Converse')], default='NIKE', max_length=8)),
                ('sku', models.CharField(max_length=15)),
                ('release_date', models.DateField(auto_now_add=True)),
                ('silhouette', models.CharField(max_length=25)),
                ('product_image1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_image', to='shop.productimages')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date_ordered', models.DateTimeField(auto_now_add=True)),
                ('total_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('order_status', models.CharField(choices=[('PO', 'Processing'), ('SE', 'Sent'), ('DE', 'Delivered')], default='PO', max_length=2)),
                ('payment_status', models.CharField(choices=[('RE', 'Received'), ('NR', 'Not-Received')], default='RE', max_length=2)),
                ('delivery_instructions', models.CharField(max_length=100)),
                ('shipping_address', models.TextField(max_length=250)),
                ('basket_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.basket')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BasketItems',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(default=1)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('basket_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='shop.basket')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
        ),
    ]