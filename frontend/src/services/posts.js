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

export const PostsService = {
  getAllPosts: async () => {
    return api.get("/posts");
  },
  getPostById: async (id) => {
    return api.get(`/posts/${id}`);
  },

  createPost: async (data) => {
    return api.post("/posts", data);
  },

  updatePost: async (id, data) => {
    return api.patch(`/posts/${id}`, data);
  },

  deletePost: async (id) => {
    return api.delete(`/posts/${id}`);
  },
  likePost: async (id) => {
    return api.post(`/posts/${id}/like`);
  },
};

// Функция для отправки URL аватара на бэкенд
export const uploadAvatarUrl = async (avatarUrl) => {
  const response = await api.post("/auth/upload-avatar", { avatarUrl });
  return response.data;
};
