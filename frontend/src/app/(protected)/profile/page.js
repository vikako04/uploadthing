/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";
import { UploadButton } from "@/utils/uploadthing";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Загрузка профиля
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await AuthService.getProfile();
        console.log("Данные пользователя:", data); // Логируем данные пользователя

        setUser(data);
      } catch (err) {
        console.error("Ошибка при получении профиля:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.push("/login");
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="login-container">
      <h1 className="login-title">Профиль пользователя</h1>

      {user && (
        <div className="profile-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Имя:</strong> {user.username}
          </p>

          {user.avatar ? (
            <div className="avatar-container">
              <img src={user.avatar} alt="Avatar" className="avatar" />
            </div>
          ) : (
            <p>Аватар не найден</p> // Сообщение, если аватар не найден
          )}
        </div>
      )}

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          const uploadedUrl = res?.[0]?.url;
          if (!uploadedUrl) return; // Если нет URL, ничего не делаем

          try {
            // Отправляем запрос на сервер для обновления аватара пользователя
            await AuthService.updateProfileAvatar(uploadedUrl);
            alert("Аватар обновлён!");
          } catch (err) {
            console.error("Ошибка при обновлении аватара:", err);
            alert("Не удалось обновить аватар.");
          }
        }}
      />
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
