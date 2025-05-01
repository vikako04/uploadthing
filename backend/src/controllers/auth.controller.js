import User from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from "../config/jwt.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({ username, email, password });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    accessToken,
    refreshToken,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    accessToken,
    refreshToken,
  });
});

// Добавлен refreshToken controller
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError(401, "Refresh token required");

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(user._id);
  res.json({ accessToken: newAccessToken });
});

// Метод для загрузки аватара
// controllers/user.controller.js
export const updateAvatar = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  if (!avatar) throw new ApiError(400, "Avatar URL is required");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true }
  );

  res.json({ message: "Avatar updated", user: updatedUser });
});
