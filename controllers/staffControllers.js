import Staff from '../model/Staff.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import CustomAPIError from '../errors/custom-api.js'

const createStaff = async (req, res) => {
  const { staffName, subject, date, level, salary } = req.body

  if (!staffName || !subject || !date || !level || !salary) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const staff = await Staff.create(req.body)
  res.status(StatusCodes.CREATED).json({ staff })
}
const getAllStaff = async (req, res) => {
  const staffs = await Staff.find({ createdBy: req.user.userId })
  res
    .status(StatusCodes.OK)
    .json({ staffs, totalStaffs: staffs.length, numOfPages: 1 })
}
const upDateStaff = async (req, res) => {
  const { id: staffId } = req.params
  const { staffName, subject, date, level, salary } = req.body
  if (!staffName || !subject || !date || !level || !salary) {
    throw new BadRequestError('Please provide all values')
  }
  const job = await Staff.findOne({ _id: staffId })
  if (!staff) {
    throw new NotFoundError(`No job with id $:{staffId}`)
  }
  const updatedStaff = await Staff.findByIdAndUpdate(
    { _id: staffId },
    req.body,
    { new: true, runValidators: true }
  )
  res.status(StatusCodes.OK).json({ updatedStaff })
}
const deleteStaff = async (req, res) => {
  const { id: staffId } = req.params
  if (!staff) {
    throw new CustomAPIError.NotFoundError(`No staff with id: ${staffId}`)
  }
  checkPermissions(req.user, staff.createdBy)
  await staff.remove()
  res.status(StatusCodes.OK), json({ msg: 'Success! Staff removed' })
}

export { createStaff, getAllStaff, upDateStaff, deleteStaff }
