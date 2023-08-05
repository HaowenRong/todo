
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  //nodes: [nodeSchema]
});

const page = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  nodes: [nodeSchema]
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  pages: [page]
});

const Doc = mongoose.model('tests', nodeSchema);

module.exports = Doc;
