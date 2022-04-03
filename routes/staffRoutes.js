import express from 'express'
const router = express.Router()

import {
  createStaff,
  getAllStaff,
  upDateStaff,
  deleteStaff,
} from '../controllers/staffControllers.js'

router.route('/').post(createStaff).get(getAllStaff)
router.route('/all/:id').delete(deleteStaff)
router.route('/:id').patch(upDateStaff)
export default router
