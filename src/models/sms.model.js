import mongoose from 'mongoose';

const SMSSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true
  },
  to: {
    type: [String],
    required: true
  },
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, 
  messageid: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export const Sms = mongoose.model('Sms', SMSSchema);