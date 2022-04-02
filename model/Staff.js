import mongoose from 'mongoose'

const StaffSchema = new mongoose.Schema(
  {
    staffName: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
    },
    subject: {
      type: String,
      required: [true, 'Please provide subject'],
      maxlength: 50,
    },
    date: {
      type: String,
      required: [true, 'Please provide date'],
      maxlength: 50,
    },
    level: {
      type: String,
      required: [true, 'Please provide class'],
      maxlength: 50,
    },
    salary: {
      type: String,
      required: [true, 'Please provide salary'],
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Staff', StaffSchema)
