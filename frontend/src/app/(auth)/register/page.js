"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "@/services/auth";

const schema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  username: z.string().min(3, "Имя пользователя слишком короткое"),
});

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await AuthService.register(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input {...register("email")} placeholder="Email" />
        {errors.email && (
          <span className="login-error">{errors.email.message}</span>
        )}

        <input {...register("username")} placeholder="Имя пользователя" />
        {errors.username && (
          <span className="login-error">{errors.username.message}</span>
        )}

        <input type="password" {...register("password")} placeholder="Пароль" />
        {errors.password && (
          <span className="login-error">{errors.password.message}</span>
        )}

        <button type="submit">Зарегистрироваться</button>
      </form>
      <p className="switch-auth">
        Уже есть аккаунт? <Link href="/login">Войдите</Link>
      </p>
    </div>
  );
}
