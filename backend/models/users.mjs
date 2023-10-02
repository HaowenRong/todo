import 'dotenv/config.js';
import mongoose from 'mongoose';

const collection = process.env.USER_COLLECTION;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model(collection, UserSchema);
