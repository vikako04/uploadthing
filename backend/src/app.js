import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middleware/errorHandler.js'
import postRoutes from './routes/post.routes.js'
const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Database connection
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling middleware
app.use(errorHandler)

export default app
