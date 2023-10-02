import { User } from '../models/users.mjs';

// read
const searchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const doc    = await User.findById(id);

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ doc });
  } catch (error) {
    res.status(500).json({ error: 'Error finding document' });
  }
};


// write
const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    const newDoc = new User({
      name,
    });

    await newDoc.save();

    res.status(201).json({ newDoc });
  } catch (error) {
    res.status(500).json({ error: 'Error creating document' });
  }
};

export { searchUser,
         createUser };
