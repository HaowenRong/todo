import mongoose from 'mongoose';

const ListingsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    default: '',
    trim: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ListingsSchema',
    default: null,
    trim: true,
  },
  color: {
    type: String,
    validation: {
      validator: function (value) {
        return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
      },
      message: "Invalid hexadecimal code",
    },
    default: '',
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

export const Listing = mongoose.model('tests', ListingsSchema);
