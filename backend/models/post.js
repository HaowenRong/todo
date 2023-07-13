
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
    required: true,
  },
});

const item = mongoose.model('tests', nodeSchema);

module.exports = item;
