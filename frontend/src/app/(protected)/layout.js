"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { isTokenExpired } from "@/services/auth";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  // Проверка авторизации при монтировании
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken || isTokenExpired(accessToken)) {
      router.push("/login");
    }
  }, []);
  return <>{children}</>;
}
