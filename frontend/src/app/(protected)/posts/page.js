/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PostsService } from "@/services/posts";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostsService.getAllPosts().then((res) => setPosts(res.data));
  }, []);

  const handleDelete = async (id) => {
    await PostsService.deletePost(id);
    setPosts(posts.filter((p) => p._id !== id));
  };

  const handleLike = async (id) => {
    await PostsService.likePost(id);
    PostsService.getAllPosts().then((res) => setPosts(res.data));
  };
  return (
    <div className="posts-container">
      <h1>Все посты</h1>
      <Link href="/newPost" className="new-post-btn">
        ➕ Создать пост
      </Link>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-card">
            {post.image && (
              <img
                src={post.image}
                alt="Изображение поста"
                className="post-card__image"
              />
            )}
            <p className="post-content">{post.content}</p>
            <div className="post-meta">
              <span>👤 Автор: {post.author?.username || "Неизвестно"}</span>
              <span>🕒 {new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="post-actions">
              <button onClick={() => handleLike(post._id)}>
                ❤️ {post.likes.length || 0}
              </button>
              <p></p>
              <Link href={`/posts/${post._id}`}>✏️ Редактировать</Link>
              <button onClick={() => handleDelete(post._id)}>🗑️ Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
