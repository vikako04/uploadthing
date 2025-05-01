"use client";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

export default function PostForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [image, setImage] = useState(initialData.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2 className="post-form__title">
        {initialData._id ? "Редактировать пост" : "Создать пост"}
      </h2>

      <div className="post-form__field">
        <label htmlFor="content" className="post-form__label">
          Контент
        </label>
        <textarea
          id="content"
          placeholder="Контент"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="post-form__textarea"
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            const uploadedUrl = res?.[0]?.url;
            if (!uploadedUrl) return; // Если нет URL, ничего не делаем

            setImage(uploadedUrl);
          }}
        />
      </div>

      <button type="submit" className="post-form__submit-btn">
        Сохранить
      </button>
    </form>
  );
}
