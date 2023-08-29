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

function searchNode(currNode, nodeId) {
  console.log('Searching node')
  console.log(currNode);
  console.log(currNode.nodes == undefined);

  if (currNode.nodes == undefined) {
    console.log("Returned by undefined")
    return { error: 'Node not found'};
  }
  if (currNode.nodes.length == 0) {
    console.log("returned by length");
    return { error: 'Node not found'};
  }

  const foundNodes   = currNode.nodes.find((node) => node);
  const searchedNode = currNode.nodes.find((node) => node._id.toString() === nodeId);

  console.log("Found nodes - " + foundNodes.nodes.length);
  
  //console.log('nodes length' + node.nodes.length)
  //console.log(node);
  
  console.log('\n');
  console.log(foundNodes._id);
  console.log(foundNodes.nodes.length);
  console.log('\n')
  console.log(foundNodes);
  console.log('\n')
  console.log('compar')
  console.log(currNode.nodes)
  console.log(searchedNode);
  if (!searchedNode) {
    console.log(0)
  }
  if (searchedNode) {
    console.log(1)
  }

  

  if (!searchedNode) {
    searchNode(foundNodes.nodes, nodeId);
  } else {
    console.log("searchedNode" + searchedNode);
    // make return correct node
    return searchedNode;
  }
}

const findNodeById = async (userId, pageId, nodeId, innerNodeId="64e7b704c124c67093648338") => {
  try {

    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return { error: 'User not found.' };
    }

    const page = user.pages.find((page) => page.title === pageId);
    if (!page) {
      return { error: 'Page not found.' };
    }

    const node = page.nodes.find((node) => node._id.toString() === nodeId);
    if (!node) {
      return { error: 'Node not found.' };
    }

    const test = await node.nodes.find((node) => node._id.toString() == innerNodeId);
    //console.log(test);
    //console.log(node);
    //console.log(node.nodes);

    const test2 = searchNode(node, innerNodeId);
    // console.log(test2);

    return {
      node: node,
      user: user
    };
  } catch (error) {
    console.log(error);
    return { error: 'Error retrieving documents.' };
  }
};

const changeNodeValue = async (userId, pageId, nodeId, newNode) => {
  try {
    const { node, user } = await findNodeById(userId, pageId, nodeId);

    node.title = newNode.title;
    node.desc  = newNode.desc;

    await user.save();

    return user;
  } catch (error) {
    console.log(error);
    return { error: 'Error retrieving or updating documents.' };
  }
};


export const getNodeById = async (req, res) => {
  const { userId, pageId, nodeId } = req.params;
  const { node } = await findNodeById(userId, pageId, nodeId);

  /*
  if (node.error) {
    return res.status(404).json({ error: node.error });
  }*/

  res.json({ node });
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
  const node = await findNodeById(userId, pageId, nodeId);

}

export const updateNode = async (req, res) => {
  const { userId, pageId, nodeId } = req.params;

  console.log(req.params);
  console.log(req.body);

  try {
    changeNodeValue(userId, pageId, nodeId, req.body);
    console.log(1111);
    res.status(200).json("dun");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating node.' });
  }
};

// todo seperate controllers into different files
