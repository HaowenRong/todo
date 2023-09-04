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

export const searchNode = async (req, res) => {

  const { userId, pageId, nodeId } = req.params;
  const node = await searchPage(userId, pageId);

  try {
    const foundNode = searchNodes(node, nodeId);
    console.log('-------------------------------------------------')
    console.log(foundNode);
    res.json(foundNode);
  } catch (error) {
    res.status(500).json({ error: 'Error searching doc'});
  }
}
