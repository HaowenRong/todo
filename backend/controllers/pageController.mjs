import { Page } from '../models/pages.mjs';

// read
const searchPage = async (req, res) => {
  try {
    const { id } = req.params;
    const doc    = await Page.findById(id);

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ doc });
  } catch (error) {
    res.status(500).json({ error: 'Error finding document' });
  }
};

const getPagesByOwner = async (req, res) => {
  try {
    const { id }  = req.params;
    const pages = await Page.find({ owner: id });

    if (!pages) {
      return res.status(404).json({ error: 'No pages for selected user' });
    }

    res.status(200).json({ pages });
  } catch (error) {
    res.status(500).json({ error: 'Error finding listings' });
  }
};


// write
const createPage = async (req, res) => {
  try {
    const { title, owner } = req.body;

    const newDoc = new Page({
      title,
      owner
    });

    await newDoc.save();

    res.status(201).json({ newDoc });
  } catch (error) {
    res.status(500).json({ error: 'Error creating document' });
  }
};

const editPage = async (req, res) => {
  try {
    const { id }        = req.params;
    const updatedValues = req.body;

    updatedValues.modifiedAt = Date();

    const updatedDoc = await Page.findByIdAndUpdate(
      id,
      updatedValues,
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ updatedDoc });
  } catch (error) {
    res.status(500).json({ error: 'Error editing document' });
  }
};

export { searchPage,
         createPage,
         editPage,
         getPagesByOwner };
