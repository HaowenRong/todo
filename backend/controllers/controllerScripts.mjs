import { Users } from "../models/post.mjs";

export async function searchPage(pageId, pageName) {
  // note searches by page name unlike other searches which search by id
  const doc = await Users.findOne(
    { _id: pageId, 'pages.title': pageName },
    { 'pages.$': 1 } // retrieve first matched page only
  ).populate('pages.nodes');
  const page = doc.pages[0];
  return page;
}

export function searchNodes(currNode, nodeToSearch, depth=1) {
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