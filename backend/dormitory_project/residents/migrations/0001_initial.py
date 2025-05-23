# Generated by Django 5.2 on 2025-04-16 17:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('house', models.CharField(max_length=10)),
                ('building', models.CharField(blank=True, max_length=10)),
                ('apartment', models.CharField(blank=True, max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Resident',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_name', models.CharField(max_length=50)),
                ('first_name', models.CharField(max_length=50)),
                ('middle_name', models.CharField(blank=True, max_length=50)),
                ('gender', models.CharField(choices=[('М', 'Мужской'), ('Ж', 'Женский')], max_length=1)),
                ('birth_date', models.DateField()),
                ('birth_place', models.CharField(max_length=100)),
                ('citizenship', models.CharField(max_length=50)),
                ('institute', models.CharField(max_length=100)),
                ('course', models.PositiveIntegerField()),
                ('category', models.CharField(max_length=100)),
                ('payment_until', models.DateField()),
                ('contract_number', models.CharField(max_length=50)),
                ('contract_date', models.DateField()),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone', models.CharField(blank=True, max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=10)),
                ('floor', models.IntegerField(blank=True, null=True)),
                ('capacity', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Passport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('series', models.CharField(max_length=10)),
                ('number', models.CharField(max_length=10)),
                ('issued_by', models.CharField(max_length=100)),
                ('issue_date', models.DateField()),
                ('resident', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='residents.resident')),
            ],
        ),
        migrations.CreateModel(
            name='Parent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=150)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('passport_series', models.CharField(blank=True, max_length=10)),
                ('passport_number', models.CharField(blank=True, max_length=10)),
                ('issued_by', models.CharField(blank=True, max_length=100)),
                ('issue_date', models.DateField(blank=True, null=True)),
                ('address', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='residents.address')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='residents.resident')),
            ],
        ),
        migrations.AddField(
            model_name='address',
            name='resident',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='residents.resident'),
        ),
        migrations.AddField(
            model_name='resident',
            name='room',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='residents.room'),
        ),
    ]
