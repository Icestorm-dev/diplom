from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Room, Resident, Passport, Address, Parent
from .serializers import (
    RoomSerializer,
    ResidentSerializer,
    PassportSerializer,
    AddressSerializer,
    ParentSerializer
)

# Добавлен SearchFilter и поля для поиска
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['number', 'floor']  # Поиск по номеру и этажу

class ResidentViewSet(viewsets.ModelViewSet):
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'middle_name']

class PassportViewSet(viewsets.ModelViewSet):
    queryset = Passport.objects.all()
    serializer_class = PassportSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['series', 'number']

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['city', 'street']

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name']

@api_view(['GET'])
def get_residents_by_room(request, room_number):
    try:
        room = Room.objects.get(number=room_number)
        residents = Resident.objects.filter(room=room)
        serializer = ResidentSerializer(residents, many=True)
        return Response(serializer.data)
    except Room.DoesNotExist:
        return Response({"error": "Комната не найдена"}, status=404)
