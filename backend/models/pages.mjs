import 'dotenv/config.js';
import mongoose from 'mongoose';

const collection = process.env.PAGES_COLLECTION;

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ListingsSchema',
    default: null,
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

export const Page = mongoose.model(collection, PageSchema);
