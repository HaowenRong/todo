import { createNodeBtn } from './form.js'
import { node } from './nodes.js';

// test nodes
//const contentContainer = document.getElementById("content");
//new node(contentContainer, "title", "desc", "", "", -1);
//new node(contentContainer, "title", "", "", "", -1);

new createNodeBtn();

const btn1 = document.getElementById('btn1');
btn1.addEventListener('click', () => {
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


