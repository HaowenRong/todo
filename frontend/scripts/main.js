import { createNodeBtn } from './forms.js'
import { node } from './nodes.js';
import { accountBtnListener, getAccount } from './accounts.js';

new createNodeBtn();

accountBtnListener();

btn1.container.addEventListener('click', () => {
  const contentContainer = document.getElementById('content');
  const a = new node(contentContainer, 'Shopping', '', '', false, -1);
  new node(a.container, 'Apples', 'Green and organic', '', false, 0);
  new node(a.container, 'Bread', 'Whole wheat', '', false, 0);
  new node(a.container, 'Butter', '', '', false, 0);
  new node(a.container, 'Ripe tomatoes', '', '', false, 0);
  new node(a.container, 'Chicken breasts', 'Skinless', '', false, 0);

  const b = new node(contentContainer, 'Current features', '', '', false, -1);
  const ba = new node(b.container, 'Nodes', '', '', false, 0);
  new node(ba.container, 'Create node categories', 'You can create new node categories with the button, indicated with a plus sign', '', false, 1);
  new node(ba.container, 'Create sub nodes', 'You can create sub categories of a node with a button on the top right of a node, indicated with a plus sign', '', false, 1);
  new node(ba.container, 'Edit nodes', 'You can edit nodes by using the edit button on the top right of a node, indicated with a pen icon', '', false, 1);
  new node(ba.container, 'Delete nodes', 'You can delete nodes by using the delete node button at the top right of a node, indicated with a cross icon', '', false, 1);
  new node(ba.container, 'Tick nodes', 'You can tick nodes by clicking on a node', '', false, 1);

  new node(b.container, 'Drag and drop', 'You can drag nodes onto other nodes to move them', '', false, 0);

  const c = new node(contentContainer, 'Comp 111', 'Todo list for ...', '', false, -1);
  const ca = new node(c.container, 'Assignment 1', '', '', false, 0);
  const caa = new node(ca.container, 'Part 1', '', '', false, 1);
  new node(caa.container, 'Create relevant variables', '', '', false, 2);
  const caaa = new node(caa.container, 'Create classes', '', '', false, 2);
  new node(caaa.container, 'Pet', '', '', false, 3);
  new node(caaa.container, 'Cat', '', '', false, 3);
  new node(caa.container, 'Create functions', '', '', false, 2);
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
  new node(contentContainer, data.title, data.desc, '', false, -1);
  
  return {
    title: data.title,
    desc: data.desc,
    color: data.color
  }
}
