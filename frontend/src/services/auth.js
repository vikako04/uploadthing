import api from "./api";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

export const AuthService = {
  // Регистрация пользователя
  register: async (userData) => {
    return api.post("/auth/register", userData);
  },
  // Авторизация пользователя
  login: async (credentials) => {
    return api.post("/auth/login", credentials);
  },
  // Получение профиля
  getProfile: async () => {
    const token = Cookies.get("accessToken");
    if (!token || isTokenExpired(token)) {
      throw new Error("Токен истек");
    }

    return api.get("/auth/profile");
  },
  updateProfileAvatar: async (avatarUrl) => {
    return api.post("/auth/avatar", { avatar: avatarUrl });
  },
  // Выход из системы
  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },
};
