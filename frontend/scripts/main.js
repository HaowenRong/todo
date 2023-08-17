import { createNodeBtn } from './forms.js'
import { Node } from './nodes.js';
import { accountBtnListener, getAccount } from './accounts.js';

new createNodeBtn();

accountBtnListener();

btn1.container.addEventListener('click', () => {
  const contentContainer = document.getElementById('content');
  const a = new Node(contentContainer, 'Shopping', '', '', false, -1);
  new Node(a.container, 'Apples', 'Green and organic', '', false, 0);
  new Node(a.container, 'Bread', 'Whole wheat', '', false, 0);
  new Node(a.container, 'Butter', '', '', false, 0);
  new Node(a.container, 'Ripe tomatoes', '', '', false, 0);
  new Node(a.container, 'Chicken breasts', 'Skinless', '', false, 0);

  const b = new Node(contentContainer, 'Current features', '', '', false, -1);
  const ba = new Node(b.container, 'Nodes', '', '', false, 0);
  new Node(ba.container, 'Create node categories', 'You can create new Node categories with the button, indicated with a plus sign', '', false, 1);
  new Node(ba.container, 'Create sub nodes', 'You can create sub categories of a node with a button on the top right of a node, indicated with a plus sign', '', false, 1);
  new Node(ba.container, 'Edit nodes', 'You can edit nodes by using the edit button on the top right of a node, indicated with a pen icon', '', false, 1);
  new Node(ba.container, 'Delete nodes', 'You can delete nodes by using the delete node button at the top right of a node, indicated with a cross icon', '', false, 1);
  new Node(ba.container, 'Tick nodes', 'You can tick nodes by clicking on a node', '', false, 1);

  new Node(b.container, 'Drag and drop', 'You can drag nodes onto other nodes to move them', '', false, 0);

  const c = new Node(contentContainer, 'Comp 111', 'Todo list for ...', '', false, -1);
  const ca = new Node(c.container, 'Assignment 1', '', '', false, 0);
  const caa = new Node(ca.container, 'Part 1', '', '', false, 1);
  new Node(caa.container, 'Create relevant variables', '', '', false, 2);
  const caaa = new Node(caa.container, 'Create classes', '', '', false, 2);
  new Node(caaa.container, 'Pet', '', '', false, 3);
  new Node(caaa.container, 'Cat', '', '', false, 3);
  new Node(caa.container, 'Create functions', '', '', false, 2);
});

async function getDocById(id) {
  try {
    const response = await fetch('http://localhost:3000/docs/' + id);
    if (!response.ok) {
      console.log("Error loading doc");
      return;
    }
    const doc = response.json();
    return doc;
  } catch (error) {
    console.log('Error:', error);
  }
}

async function extractData(id) {
  const data = await getDocById(id);
  console.log(data);
  const contentContainer = document.getElementById('content');
  new Node(contentContainer, data.title, data.desc, '', false, -1);
  
  return {
    title: data.title,
    desc: data.desc,
    color: data.color
  }
}
