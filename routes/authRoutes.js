import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15min
  max: 10,
  message:
    'Too many request from this IP address, Please try again after 15 min',
})

import { register, login } from '../controllers/authController.js'

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)

export default router
