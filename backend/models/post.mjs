import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema();
nodeSchema.add({
  nodeTitle: {
    type: String,
    required: true,
  },
  nodeDesc: {
    type: String,
    required: false,
  },
  nodes: [nodeSchema]
});

const pageSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    required: true,
    unique: true
  },
  nodes: [nodeSchema]
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userPages: [pageSchema]
});
export const UserDoc = mongoose.model('tests', userSchema);

