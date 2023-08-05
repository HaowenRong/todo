import { node } from './nodes.js';
import { searchUser } from './backend/api.js';

function createBtn(pageName) {
  const btn = document.createElement('div');
  btn.className = 'btn';
  btn.textContent = pageName;

  return btn;
}

export class pageBtn {
  #pageName;
  #parent;
  container;
  constructor(pageName) {
    this.#pageName = pageName;
    this.#parent = document.getElementById('sideBar');
    this.container = createBtn(this.#pageName);

    this.#parent.append(this.container);

    this.container.addEventListener('click', () => {
      let currPageName = document.getElementById('currentPage');
      currPageName.textContent = this.#pageName;
    });
  }
}

export async function loadUserPages(userId) {
  // todo code to remove previous buttons
  const userData  = await searchUser(userId);
  const userPages = userData.pages;

  // loop through users pages and create buttons
  userPages.forEach(element => {
    console.log(element);
    new pageBtn(element.title);
  });
}

function displayNodes(nodes) {
  nodes.forEach(element => {
    console.log(element);
    const container = document.getElementById('content');
    console.log(container)
    new node(container, element.title, element.desc, "", "", 0);
  });
}

export async function viewAll(userId) {
  const userData  = await searchUser(userId);
  const userPages = userData.pages;

  userPages.forEach(element => {
    displayNodes(element.nodes);
    console.log('iterated ---------------------------------------')
  });
}
