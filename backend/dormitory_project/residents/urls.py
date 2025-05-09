from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RoomViewSet,
    ResidentViewSet,
    PassportViewSet,
    AddressViewSet,
    ParentViewSet,
    get_residents_by_room
)
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'residents', ResidentViewSet)
router.register(r'passports', PassportViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'parents', ParentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', obtain_auth_token, name='api_token_auth'),
    path('api/residents-by-room/<str:room_number>/', get_residents_by_room, name='residents-by-room'),
]
