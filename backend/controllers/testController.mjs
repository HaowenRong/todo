import { Users } from '../models/post.mjs';
import { searchPage, searchNodes } from './controllerScripts.mjs';

export const getDocs = async (req, res) => {

  console.log("Get all docs ---------------------------------");

  try {
    const docs = await Users.find({});
    res.json(docs);
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: 'Error retreiving documents1'});
  }
};

export const getDocById = async (req, res) => {

  console.log("Get doc by ID ---------------------------------");

  try {
    const doc = await Users.findOne({ _id: req.params.id });
    console.log(doc);
    res.json(doc);
  } catch(error) {
    res.status(500).json({ error: 'Error retreiving documents2'});
  }
};

export const getPageById = async (req, res) => {
  const { id, name } = req.params;

  console.log("Get page by ID ---------------------------------");
  console.log(req.params);

  try {
    const page = searchPage(id, name);
    res.json({ page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving documents' });
  }
};

export const getNodeById = async (req, res) => {
  const { userId, pageId, nodeId } = req.params;
  const node = await searchPage(userId, pageId);

  console.log("Search node ---------------------------------");

  try {
    const foundNode = searchNodes(node, nodeId);
    res.json(foundNode);
  } catch (error) {
    res.status(500).json({ error: 'Error searching doc'});
  }
}

export const test = async (req, res) => {

  try {
    const { user, page } = await searchPage('64e79aaf4916e929fa95664f', 'page');
    page.title = 'aaaatest';
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error searching doc'});
  }
}

export const updateNode = async (req, res) => {
  const { userId, pageId, nodeId } = req.params;

  console.log("Parameters:");
  console.log(req.params);
  console.log("Body:");
  console.log(req.body);

  try {
    const newNode = await changeNodeValue(userId, pageId, nodeId, req.body);
    // console.log(newNode.error);
    res.status(200).json(newNode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating node.' });
  }
};

const changeNodeValue = async (userId, pageId, nodeId) => {
  try {

    const user = await Users.findOne({ _id: userId });
    if (!user) {
      console.log(11)
      return { error: 'User not found.' };
    }
    console.log (user instanceof Users);

    const currNode = await searchPage(userId, pageId);
    console.log(currNode);

    const node = await searchNodes(currNode, nodeId, user);
    console.log('before ---------------------------------------------');
    console.log(node);

    node.title = 'new title';

    console.log('after ---------------------------------------------');
    console.log(node);

    await user.save();

    console.log('user ---------------------------------------------');
    console.log(user);

    return user;
  } catch (error) {
    console.log(error);
    return { error: 'Error retrieving or updating documents.' };
  }
};
