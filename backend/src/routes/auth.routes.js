import express from "express";
import {
  register,
  login,
  refreshToken,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateLogin, validateRegistration } from "../middleware/validate.js";
import { updateAvatar } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);
router.get("/profile", protect, (req, res) => {
  const { id, username, email, avatar } = req.user;
  res.json({ id, username, email, avatar });
});
router.post("/avatar", protect, updateAvatar);

export default router;
