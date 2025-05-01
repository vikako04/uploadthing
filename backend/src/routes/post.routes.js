import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  toggleLike,
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/my", protect, getMyPosts);
router.patch("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, toggleLike);

export default router;
