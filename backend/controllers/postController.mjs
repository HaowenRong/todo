import { Users } from '../models/post.mjs';

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

async function searchPage(pageId, pageName) {
  // note searches by page name unlike other searches which search by id
  const doc = await Users.findOne(
    { _id: pageId, 'pages.title': pageName },
    { 'pages.$': 1 } // retrieve first matched page only
  ).populate('pages.nodes');
  const page = doc.pages[0];
  return page;
}

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

export const searchNodeTest = async (req, res) => {

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

function searchNodes(currNode, nodeToSearch, depth=1) {
  try {
    console.log(`search node --------------------------------- depth - ${depth}`);
    const searchedNode = currNode.nodes.find((node) => node._id.toString() === nodeToSearch);

    console.log(currNode.nodes);

    if (searchedNode) {
      console.log(`Node found at depth: ${depth}`);
      console.log("Node: vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
      console.log(searchedNode);
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      return searchedNode;
    } else {
      // if node is not found, search through its nodes for the node
      for (const node of currNode.nodes) {
        const foundNode = searchNodes(node, nodeToSearch, depth+1);
        if (foundNode) {
          console.log(`Node found at depth: ${depth}`);
          console.log("Node: vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
          console.log(searchedNode);
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
          return foundNode;
        }
      }
    }

    return null; // node not found
  } catch (error) {
    console.error(error);
    return null;
  }
}

const findNodeById = async (userId, pageId, nodeId, innerNodeId="64e7b704c124c67093648337") => {
  try {
    console.log(1)

    const user = await Users.findOne({ _id: userId });
    if (!user) {
      console.log(11)
      return { error: 'User not found.' };
    }
    console.log(2)

    const page = user.pages.find((page) => page.title === pageId);
    if (!page) {
      console.log(22)
      return { error: 'Page not found.' };
    }
    console.log(3)

    const node = page.nodes.find((node) => node._id.toString() === nodeId);
    if (!node) {
      console.log(33)
      return { error: 'Node not found.' };
    }
    console.log(4)

    //const test = await node.nodes.find((node) => node._id.toString() == innerNodeId);
    //console.log(test);
    //console.log(node);
    //console.log(node.nodes);

    const test2 = searchNode(node, innerNodeId);
    console.log(test2);

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
