import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  }, 
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  apikey: {
    type: String
  }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);