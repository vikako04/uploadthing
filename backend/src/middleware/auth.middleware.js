import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/User.model.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = await User.findById(decoded.userId).select('-password')
    next()
  } catch (error) {
    throw new ApiError(401, 'Not authorized, token failed')
  }
})
