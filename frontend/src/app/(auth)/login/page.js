"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthService } from "@/services/auth";
import { isTokenExpired } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token && !isTokenExpired(token)) {
      router.push("/profile");
    }
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.login(formData);
      // Сохраняем токены
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);
      router.push("/profile");
    } catch (err) {
      setError("Ошибка входа: проверьте данные");
    }
  };
  return (
    <div className="login-container">
      <h1 className="login-title">Вход</h1>
      {error && <div className="login-error">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        />
        <button type="submit">Войти</button>
      </form>
      <p className="switch-auth">
        Нет аккаунта? <Link href="/register">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
}
