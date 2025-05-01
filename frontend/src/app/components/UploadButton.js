// components/UploadButton.js
"use client";

import { UploadButton } from "@uploadthing/react";

export default function MyUploadButton({ onUploadComplete }) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          console.log("Файл загружен:", res[0].url);
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error) => {
        alert(`Ошибка загрузки: ${error.message}`);
      }}
    />
  );
}
