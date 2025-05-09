from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Room, Resident, Passport, Address, Parent


# Inline-модель для паспорта (отображается прямо в форме проживающего)
class PassportInline(admin.StackedInline):
    model = Passport
    can_delete = False
    verbose_name_plural = "Паспорт"
    fk_name = "resident"


# Inline-модель для адреса (отображается прямо в форме проживающего)
class AddressInline(admin.StackedInline):
    model = Address
    can_delete = False
    verbose_name_plural = "Адрес регистрации"
    fk_name = "resident"


# Inline-модель для родителя (можно добавить несколько)
class ParentInline(admin.StackedInline):
    model = Parent
    extra = 1  # Кол-во пустых форм по умолчанию
    verbose_name_plural = "Родители / Представители"
    fk_name = "resident"


# Регистрация модели для комнаты
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('number', 'floor', 'capacity')
    search_fields = ('number__icontains',)
    list_filter = ('floor',)


# Регистрация модели для проживающего с инлайн-моделями
@admin.register(Resident)
class ResidentAdmin(admin.ModelAdmin):
    list_display = (
        'last_name', 'first_name', 'middle_name',
        'room', 'institute', 'course', 'category', 'payment_until'
    )
    search_fields = (
        'last_name__icontains',
        'first_name__icontains',
        'middle_name__icontains',
        'room__number__icontains',
        'institute__icontains'
    )
    list_filter = ('gender', 'course', 'category', 'room')
    ordering = ('last_name', 'first_name')
    inlines = [PassportInline, AddressInline, ParentInline]  # Вставляем связанные модели


# Регистрация модели для паспорта (остаётся, на случай если редактирование нужно отдельно)
@admin.register(Passport)
class PassportAdmin(admin.ModelAdmin):
    list_display = ('resident', 'series', 'number', 'issued_by', 'issue_date')
    search_fields = (
        'resident__last_name__icontains',
        'resident__first_name__icontains',
        'number__icontains'
    )


# Регистрация модели для адреса (остаётся, как и выше)
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('resident', 'city', 'street', 'house', 'building', 'apartment')
    search_fields = (
        'resident__last_name__icontains',
        'resident__first_name__icontains',
        'city__icontains',
        'street__icontains'
    )


# Регистрация модели для родителя
@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('resident', 'full_name', 'phone', 'passport_series', 'passport_number')
    search_fields = (
        'resident__last_name__icontains',
        'resident__first_name__icontains',
        'full_name__icontains'
    )
    list_filter = ('resident__room',)


# Перевод интерфейса админки на русский язык
admin.site.site_header = _("Административная панель общежития")
admin.site.site_title = _("Общежитие")
admin.site.index_title = _("Управление проживающими и комнатами")
