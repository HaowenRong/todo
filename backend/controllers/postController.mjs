import { Users } from '../models/post.mjs';

export const getDocs = async (req, res) => {
  try {
    const docs = await Users.find({});
    console.log(2);
    res.json(docs);
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: 'Error retreiving documents1'});
  }
};

export const getDocById = async (req, res) => {
  try {
    console.log(11);
    const doc = await Users.findOne({ _id: req.params.id });
    console.log(doc);
    res.json(doc);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents2'});
  }
};

export const getPageById = async (req, res) => {
  const { id, name } = req.params;
  console.log(req.params);

  try {
    const doc = await Users.findOne(
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


export const getNodeById = async (req, res) => {
  const { userId, pageId, nodeId } = req.params;

  try {
    // check parameters are not empty
    if (!userId || !pageId || !nodeId) {
      return res.status(400).json({ error: `Missing parameters. ${req.params}` });
    }

    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const page = user.pages.find((page) => page.title === pageId);
    if (!page) {
      return res.status(404).json({ error: 'Page not found.' });
    }

    const node = page.nodes.find((node) => node._id.toString() === nodeId);
    if (!node) {
      return res.status(404).json({ error: 'Node not found.' });
    }

    res.json({ node });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving documents.' });
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
  const {name, pages} = req.body;
  console.log(1);
  try {
    const newDoc = new UserDoc({
      name,
      pages,
    });
    console.log(2);

    const insertedDoc = await newDoc.save();
    console.log(3);
    res.status(201).json(insertedDoc);
  } catch (error) {
    res.status(500).json({ error: 'Error creating doc'});
  }
}

export const createNewNode = async (req, res) => {
  try {
    console.log(req.params);

    // check if user exists
    const doc = await UserDoc.findById(req.params.userId);
    console.log(doc);
    if (doc == null) { return; }

    const node = await Nodes.findById(req.params.nodeId);
    console.log(node);
    res.json(doc);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents5'});
  }
}

export const updateNode = async (req, res) => {

}

// todo seperate controllers into different files
