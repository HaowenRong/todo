import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema();
nodeSchema.add({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  nodes: [nodeSchema]
});

const page = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  nodes: [nodeSchema]
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pages: [page]
});
export const UserDoc = mongoose.model('tests', userSchema);

