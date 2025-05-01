"use client";
import PostForm from "@/app/components/PostForm";
import { PostsService } from "@/services/posts";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await PostsService.createPost(data);
      router.push("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return <PostForm onSubmit={handleSubmit} />;
}
