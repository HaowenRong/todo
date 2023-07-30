
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  nodes: [nodeSchema]
});
const UserDoc = mongoose.model('tests', userSchema);

module.exports = {
  UserDoc
};
