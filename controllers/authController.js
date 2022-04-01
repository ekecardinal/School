import User from '../model/user.js'
// import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'

const register = async (req, res) => {
  const { email, password, name } = req.body
  // console.log(req.body)
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide all values')
  // }
  try {
    const user = await User.create(req.body)

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user, token })
  } catch (error) {
    res.status(500).json({ msg: 'there was an error' })
  }
  //   const { email, password, name } = req.body

  //   if (!name || !email || !password) {
  //     throw new BadRequestError('Please provide all values')
  //   }

  //   const userAlreadyExists = await User.findOne({ email })
  //   if (userAlreadyExists) {
  //     throw new BadRequestError('Email already in use')
  //   }

  //   const user = await User.create({ email, password, name })
  //   const token = user.createJWT()
  //   res.status(StatusCodes.CREATED).json({
  //     user: {
  //       email: user.email,
  //       lastName: user.lastName,
  //       name: user.name,
  //       location: user.location,
  //     },
  //     token,
  //     location: user.location,
  //   })
}
const login = async (req, res) => {
  res.send('Login')
  //   const { email, password } = req.body
  //   if (!email || !password) {
  //     throw new BadRequestError('Please provide all values')
  //   }
  //   const user = await User.findOne({ email }).select('+password')
  //   if (!user) {
  //     throw new UnAuthenticatedError('Invalid credentials')
  //   }
  //   // console.log(user)
  //   const isPasswordCorrect = await user.comparePassword(password)
  //   if (!isPasswordCorrect) {
  //     throw new UnAuthenticatedError('Invalid Credentials')
  //   }
  //   const token = user.createJWT()
  //   user.password = undefined
  //   res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
export { register, login }
