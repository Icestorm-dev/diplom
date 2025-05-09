from django.db import models
from django.core.exceptions import ValidationError


# Модель для представления комнаты в общежитии
class Room(models.Model):
    number = models.CharField(max_length=10, verbose_name="Номер комнаты")  # Номер комнаты (например, "101", "12А")
    floor = models.IntegerField(null=True, blank=True, verbose_name="Этаж")  # Этаж, можно оставить пустым
    capacity = models.IntegerField(null=True, blank=True, verbose_name="Вместимость комнаты(кол-во чел.)")  # Вместимость комнаты (кол-во мест)

    class Meta:
        verbose_name = "Комната"
        verbose_name_plural = "Комнаты"

    def __str__(self):
        return f"Комната {self.number}"


# Основная модель — Проживающий (студент)
class Resident(models.Model):
    # Персональные данные
    last_name = models.CharField(max_length=50, verbose_name="Фамилия")  # Фамилия
    first_name = models.CharField(max_length=50, verbose_name="Имя")  # Имя
    middle_name = models.CharField(max_length=50, blank=True, verbose_name="Отчество")  # Отчество (может отсутствовать)
    gender = models.CharField(max_length=1, choices=[('М', 'Мужской'), ('Ж', 'Женский')], verbose_name="Пол")  # Пол
    birth_date = models.DateField(verbose_name="Дата рождения")  # Дата рождения
    birth_place = models.CharField(max_length=100, verbose_name="Место рождения")  # Место рождения
    citizenship = models.CharField(max_length=50, verbose_name="Гражданство")  # Гражданство

    # Образование
    institute = models.CharField(max_length=100, verbose_name="Институт")  # Название института
    course = models.PositiveIntegerField(verbose_name="Курс обучения")  # Курс обучения
    category = models.CharField(max_length=100, verbose_name="Категория проживания")  # Категория проживания (например, "льготник")

    # Оплата и договор
    payment_until = models.DateField(verbose_name="До какого числа оплачено")  # До какого числа оплачено
    contract_number = models.CharField(max_length=50, verbose_name="Номер договора")  # Номер договора
    contract_date = models.DateField(verbose_name="Дата заключения договора")  # Дата заключения договора

    # Контактные данные
    email = models.EmailField(blank=True, verbose_name="Email")  # Email (может быть пустым)
    phone = models.CharField(max_length=20, blank=True, verbose_name="Телефон")  # Телефон (может быть пустым)

    # Комната
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, verbose_name="Комната")  # Связь с комнатой

    class Meta:
        verbose_name = "Проживающий"
        verbose_name_plural = "Проживающие"

    def __str__(self):
        room_number = self.room.number if self.room else "Без комнаты"
        return f"{self.last_name} {self.first_name} {self.middle_name} - {room_number}"

    def clean(self):
        """
        Проверка: если указана комната — в неё не должно быть заселено больше жильцов,
        чем указано в поле capacity.
        """
        if self.room:
            current_occupants = Resident.objects.filter(room=self.room).exclude(pk=self.pk).count()
            if self.room.capacity is not None and current_occupants >= self.room.capacity:
                raise ValidationError(f"Комната {self.room.number} уже заполнена "
                                      f"(вместимость: {self.room.capacity}).")

    def save(self, *args, **kwargs):
        self.clean()  # Проверка перед сохранением
        super().save(*args, **kwargs)


# Паспортные данные проживающего
class Passport(models.Model):
    resident = models.OneToOneField(Resident, on_delete=models.CASCADE, verbose_name="Проживающий")  # Один паспорт на одного проживающего
    series = models.CharField(max_length=10, verbose_name="Серия паспорта")  # Серия паспорта
    number = models.CharField(max_length=10, verbose_name="Номер паспорта")  # Номер паспорта
    issued_by = models.CharField(max_length=100, verbose_name="Кем выдан")  # Кем выдан
    issue_date = models.DateField(verbose_name="Дата выдачи")  # Дата выдачи

    class Meta:
        verbose_name = "Паспорт"
        verbose_name_plural = "Паспорта"

    def __str__(self):
        return f"Паспорт {self.series} {self.number}"


# Адрес регистрации проживающего
class Address(models.Model):
    resident = models.OneToOneField(Resident, on_delete=models.CASCADE, verbose_name="Проживающий")  # Один адрес на одного проживающего
    city = models.CharField(max_length=100, verbose_name="Город")  # Город
    street = models.CharField(max_length=100, verbose_name="Улица")  # Улица
    house = models.CharField(max_length=10, verbose_name="Дом")  # Дом
    building = models.CharField(max_length=10, blank=True, verbose_name="Корпус")  # Корпус (может быть пустым)
    apartment = models.CharField(max_length=10, blank=True, verbose_name="Квартира")  # Квартира (может быть пустой)

    class Meta:
        verbose_name = "Адрес"
        verbose_name_plural = "Адреса"

    def __str__(self):
        return f"{self.city}, {self.street}, д. {self.house}"


# Родитель или законный представитель проживающего
class Parent(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, verbose_name="Проживающий")  # Родитель относится к проживающему
    full_name = models.CharField(max_length=150, verbose_name="ФИО родителя/представителя")  # ФИО родителя/представителя
    phone = models.CharField(max_length=20, blank=True, verbose_name="Телефон")  # Телефон родителя

    # Паспорт родителя (необязательно)
    passport_series = models.CharField(max_length=10, blank=True, verbose_name="Серия паспорта")  # Серия паспорта
    passport_number = models.CharField(max_length=10, blank=True, verbose_name="Номер паспорта")  # Номер паспорта
    issued_by = models.CharField(max_length=100, blank=True, verbose_name="Кем выдан")  # Кем выдан
    issue_date = models.DateField(null=True, blank=True, verbose_name="Дата выдачи")  # Дата выдачи

    # Адрес (если отличается от адреса проживающего)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Адрес")

    class Meta:
        verbose_name = "Родитель"
        verbose_name_plural = "Родители"

    def __str__(self):
        return self.full_name
