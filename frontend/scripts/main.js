import { createNodeBtn } from './forms.js'
import { Node } from './nodes.js';
import { accountBtnListener } from './accounts.js';
import { getAccount } from './cookies/accounts.js';
import { message } from './messages.js';

new createNodeBtn();

accountBtnListener();

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
