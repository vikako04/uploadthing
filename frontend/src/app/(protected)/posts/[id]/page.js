"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "@/app/components/PostForm";
import { PostsService } from "@/services/posts";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    PostsService.getPostById(id).then((res) => setPost(res.data));
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await PostsService.updatePost(id, data);
      router.push("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <div>Загрузка...</div>;

  return <PostForm initialData={post} onSubmit={handleSubmit} />;
}
