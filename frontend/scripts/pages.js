import { node } from './nodes.js';
import { getAccount } from './accounts.js';
import { searchUser, fetchPage } from './backend/api.js';

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

      if (pageName == 'View All') {
        viewAll(getAccount());
        return;
      }

      let currPageName = document.getElementById('currentPage');
      currPageName.textContent = this.#pageName;
      loadPage(getAccount(), this.#pageName);
    });
  }
}

async function loadPage(userId, pageName) {
  const page  = await fetchPage(userId, pageName);
  const nodes = page.page.nodes;
  clearPage();
  displayNodes(nodes);
}

export async function loadUserPages(userId) {
  // todo code to remove previous buttons
  const userData  = await searchUser(userId);
  const userPages = userData.pages;

  new pageBtn('View All');

  // loop through users pages and create buttons
  userPages.forEach(element => {
    console.log(element);
    new pageBtn(element.title);
  });
}

export function displayNodes(nodes) {
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

  clearPage();

  userPages.forEach(element => {
    displayNodes(element.nodes);
    console.log('iterated ---------------------------------------')
  });
}

function clearPage() {
  let content = document.getElementById('content');
  content.innerHTML = ''; // remove all html inside element
}
