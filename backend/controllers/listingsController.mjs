import { Listing } from '../models/listing.mjs';

// read
const searchDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const doc    = await Listing.findById(id);

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ doc });
  } catch (error) {
    res.status(500).json({ error: 'Error finding document' });
  }
};

const getListingsPerParent = async (req, res) => {
  try {
    const { id }  = req.params;
    const listings = await Listing.find({ parent: id });

    if (!listings) {
      return res.status(404).json({ error: 'No listings for selected page' });
    }

    res.status(200).json({ listings });
  } catch (error) {
    res.status(500).json({ error: 'Error finding listings' });
  }
};


// write
const createDoc = async (req, res) => {
  try {
    const { title, desc, parent, color } = req.body;

    const newDoc = new Listing({
      title,
      desc,
      parent,
      color
    });

    await newDoc.save();

    res.status(201).json({ newDoc });
  } catch (error) {
    res.status(500).json({ error: 'Error creating document' });
  }
};

const editDoc = async (req, res) => {
  try {
    const { id }        = req.params;
    const updatedValues = req.body;

    // add a modified property to update the modified at property
    updatedValues.modifiedAt = Date(); // todo make it follow timezones. probably better implemented in the front end

    const updatedDoc = await Listing.findByIdAndUpdate(
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

export { searchDoc,
         createDoc,
         editDoc,
         getListingsPerParent };
