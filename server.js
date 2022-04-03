import cors from 'cors'
import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//Db
import connectDB from './connectDb/connect.js'

//routers
import authRouter from './routes/authRoutes.js'
import staffRouter from './routes/staffRoutes.js'

//Middleware
import notFoundMiddleware from './middleware/NotFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// app.get('/', (req, res) => {
//   res.send({ msg: 'welcome' })
// })

app.use('/api/auth', authRouter)
app.use('/api/staff', authenticateUser, staffRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
