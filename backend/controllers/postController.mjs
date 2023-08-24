import { UserDoc } from '../models/post.mjs';

export const getDocs = async (req, res) => {
  try {
    const docs = await UserDoc.find({});
    res.json(docs);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents1'});
  }
};

export const getDocById = async (req, res) => {
  try {
    const doc = await UserDoc.findById(req.params.id);
    res.json(doc);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents2'});
  }
};

export const getPageById = async (req, res) => {
  const { id, name } = req.params;
  console.log(req.params);
  console.log(id);
  console.log(name);

  try {
    const doc = await UserDoc.findOne(
      { _id: id, 'pages.title': name },
      { 'pages.$': 1 } // retrieve first matched page only
    ).populate('pages.nodes');
    const page = doc.pages[0];
    res.json({ page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving documents' });
  }
};

export const getDocsByTitle = async (req, res) => {
  try {
    const docs = await UserDoc.find({title: req.params.title});
    res.json(docs);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents3'});
  }
};

export const getDocByDesc = async (req, res) => {
  try {
    const docs = await UserSchema.find({desc: req.params.desc});
    res.json(docs);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents4'});
  }
};

export const createDoc = async (req, res) => {
  const {userName, userPages} = req.body;
  console.log(1);
  try {
    const newDoc = new UserDoc({
      userName,
      userPages,
    });
    console.log(2);

    const insertedDoc = await newDoc.save();
    console.log(3);
    res.status(201).json(insertedDoc);
  } catch (error) {
    res.status(500).json({ error: 'Error creating doc'});
  }
}

export const saveNewNode = async (req, res) => {

}

export const updateNode = async (req, res) => {

}

// todo seperate controllers into different files
