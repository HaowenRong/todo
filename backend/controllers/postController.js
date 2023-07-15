
const Doc = require('../models/post');

const getDocs = async (req, res) => {
  try {
    const docs = await Doc.find({});
    res.json(docs);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents1'});
  }
};

const getDocById = async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);
    res.json(doc);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents2'});
  }
};

const getDocsByTitle = async (req, res) => {
  try {
    const docs = await Doc.find({title: req.params.title});
    res.json(docs);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents3'});
  }
};

const getDocByDesc = async (req, res) => {
  try {
    const docs = await Doc.find({desc: req.params.desc});
    res.json(docs);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents4'});
  }
};

const createDoc = async (req, res) => {
  const {title, desc, color} = req.body;
  console.log(1);
  try {
    const newDoc = new Doc({
      title,
      desc,
      color
    });
    console.log(2);

    const insertedDoc = await newDoc.save();
    console.log(3);
    res.status(201).json(insertedDoc);
  } catch (error) {
    res.status(500).json({ error: 'Error creating doc'});
  }
}

module.exports = {
  getDocs,
  getDocById,
  getDocsByTitle,
  getDocByDesc,
  createDoc
}
