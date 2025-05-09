# 🏢 Система учёта проживания в УГК «Пушкинский»

## 📌 Описание

Веб-приложение для управления информацией о проживающих в студенческом общежитии, комнатах, родителях и паспортах. Реализован интерфейс для администратора с возможностью добавления, редактирования и удаления данных.

### 🔧 Технологии

- **Backend**: Django, Django REST Framework, SQLite, Token-аутентификация
- **Frontend**: React + Bootstrap (React-Bootstrap)
- **Прочее**: Axios, React Router, пагинация, фильтрация, модальные окна, валидация

---

## 🚀 Основные возможности

- 🔐 Авторизация через Token
- 📋 Управление списком проживающих
- 🛏 Добавление/редактирование/удаление комнат
- 👪 Привязка родителей к несовершеннолетним
- 🗂 Работа с паспортами и адресами
- 🔎 Поиск и фильтрация данных
- ⚠ Предупреждение при попытке удалить комнату с проживающими
- 📦 REST API с пагинацией и поддержкой поиска

---

## 📸 Скриншоты

---

## ⚙ Установка

### 🖥 Backend

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo/backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
