
const item = require('../models/post');

const getPosts = async (req, res) => {
  try {
    const items = await item.find({});
    res.json(items);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving items'});
  }
};

module.exports = {
  getPosts
}
