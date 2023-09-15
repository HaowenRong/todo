import { Users } from "../models/post.mjs";

export async function searchPage(userId, pageId) {

  const user = await Users.findOne({ _id: userId });
  if (!user) {
    return { error: 'User not found.' };
  }

  const page = user.pages.find((page) => page.title === pageId);
  if (!page) {
    return { error: 'Page not found.' };
  }
  return { user, page };
}

export async function searchNodes(currNode, nodeToSearch, user, depth = 1) {
  try {
    console.log(`Searching node --------------------------------- depth - ${depth}`);
    const searchedNode = currNode.nodes.find((node) => node._id.toString() === nodeToSearch);

    console.log(currNode.nodes);

    if (searchedNode) {
      console.log(`Node found at depth: ${depth}`);
      // Change the title of the found node to 'a'
      searchedNode.title = 'a';
      
      // Save the user object after the update
      await user.save();
      
      return searchedNode;
    } else {
      // if the node is not found, search through its nodes for the node
      for (const node of currNode.nodes) {
        const foundNode = await searchNodes(node, nodeToSearch, user, depth + 1);
        if (foundNode) {
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
