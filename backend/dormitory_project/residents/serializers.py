from rest_framework import serializers
from .models import Room, Resident, Passport, Address, Parent


class RoomSerializer(serializers.ModelSerializer):
    residents = serializers.SerializerMethodField()
    occupied_places = serializers.SerializerMethodField()
    free_places = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ['id', 'number', 'floor', 'capacity', 'residents', 'occupied_places', 'free_places']

    def get_residents(self, obj):
        residents = Resident.objects.filter(room=obj)
        return ResidentShortSerializer(residents, many=True).data

    def get_occupied_places(self, obj):
        return Resident.objects.filter(room=obj).count()

    def get_free_places(self, obj):
        occupied = Resident.objects.filter(room=obj).count()
        return obj.capacity - occupied
    #проверка вместимости
    def validate_capacity(self, value):
        if value < 1:
            raise serializers.ValidationError("Вместимость должна быть минимум 1.")
        return value



class ResidentSerializer(serializers.ModelSerializer):
    room = RoomSerializer()  # используем вложенный сериализатор

    class Meta:
        model = Resident
        fields = [
            'id',
            'last_name',
            'first_name',
            'middle_name',
            'gender',
            'birth_date',
            'room',
            'institute',
            'course',
            'category',
            'payment_until',
        ]

#для отображения комнат
class ResidentShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resident
        fields = ['id', 'last_name', 'first_name', 'middle_name']

# class PassportSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Passport
#         fields = ['id', 'resident', 'series', 'number', 'issued_by', 'issue_date']

class PassportSerializer(serializers.ModelSerializer):
    resident_fio = serializers.SerializerMethodField()

    class Meta:
        model = Passport
        fields = ['id', 'resident', 'series', 'number', 'issued_by', 'issue_date', 'resident_fio']

    def get_resident_fio(self, obj):
        return f"{obj.resident.last_name} {obj.resident.first_name} {obj.resident.middle_name}"

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'resident', 'city', 'street', 'house', 'building', 'apartment']


class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = [
            'id', 'resident', 'full_name', 'phone',
            'passport_series', 'passport_number',
            'issued_by', 'issue_date', 'address'
        ]
