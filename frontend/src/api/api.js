import axios from "axios";

// Базовый URL для API
const API_BASE_URL = "http://localhost:8000/api/";

// Создаём axios-инстанс
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Функция для добавления токена в заголовки
const setAuthToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
};

// Получение токена и установка заголовка авторизации
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}token/`, {
      username,
      password,
    });

    const token = response.data.token;

    // Устанавливаем токен для всех последующих запросов
    localStorage.setItem("token", token); // Сохраняем токен в localStorage
    setAuthToken(); // Устанавливаем заголовок авторизации

    return token;
  } catch (error) {
    throw error;
  }
};

// Вызовы API с добавлением авторизации
export const fetchResidents = async () => {
  setAuthToken(); // Устанавливаем заголовок перед запросом
  const response = await api.get("residents/");
  return response.data;
};

export const fetchRooms = async () => {
  setAuthToken(); // Устанавливаем заголовок перед запросом
  const response = await api.get("rooms/");
  return response.data;
};

// Функция для добавления комнаты
export const addRoom = async (newRoom) => {
  setAuthToken(); // Устанавливаем заголовок перед запросом
  const response = await api.post("rooms/", newRoom); // Отправляем запрос для добавления новой комнаты
  return response.data; // Возвращаем данные, полученные от сервера (например, подтверждение или объект комнаты)
};

// Функция для изменения комнаты
export const updateRoom = async (id, updatedRoom) => {
  setAuthToken(); // Устанавливаем заголовок перед запросом
  const response = await api.put(`rooms/${id}/`, updatedRoom); // Отправляем PUT-запрос для обновления комнаты
  return response.data; // Возвращаем обновленные данные комнаты
};

// Функция для удаления комнаты
export const deleteRoom = async (id) => {
  setAuthToken();
  await api.delete(`rooms/${id}/`);
};

export const fetchPassports = async () => {
  setAuthToken(); // Устанавливаем заголовок перед запросом
  const response = await api.get("passports/");
  return response.data;
};

export const fetchAddresses = async () => {
  setAuthToken(); // Устанавливаем заголовок перед запросом
  const response = await api.get("addresses/");
  return response.data;
};

export const fetchParents = async () => {
  setAuthToken(); // Устанавливаем заголовок перед запросом
  const response = await api.get("parents/");
  return response.data;
};

export default api;
