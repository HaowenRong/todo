import { Node } from './nodes.js';
import { createNodeBtn } from './forms.js'
import { getAccount } from './cookies/accounts.js';
import { searchUser, fetchPage, searchPages, searchListings } from './backend/api.js';

class btn {
  container;
  constructor(btnName, type='button') {
    this.container = document.createElement('input');
    this.container.type = type;
    this.container.className = 'btn';
    this.container.value = btnName;
  }
  
}

export class createPageBtn {
  #parent = document.getElementById('sideBar');;
  #btn    = new btn('+', 'text');
  constructor() {
    this.#btn.container.classList.add('createPageBtn');
    this.#btn.container.style.textAlign = 'center';
    this.#btn.container.style.order = '1';

    this.#parent.appendChild(this.#btn.container);

    this.#btn.container.addEventListener('click', this.toggleEdit);

    this.#btn.container.addEventListener('keyup', (event) => {
      this.createBtn(event);
    });
  }
  
  createBtn(event) {
    if (event.key != 'Enter')            { return; }
    if (this.#btn.container.value == '') { return; }

    // create a new button from the inputted value
    new pageBtn(this.#btn.container.value);

    this.resetBtn();
  }

  resetBtn() {
    this.#btn.container.style.textAlign = 'center';
    this.#btn.container.value = '+';
    this.#btn.container.blur();
  }

  toggleEdit = () => {
    // aligned text is used to determine which state the button is in
    // only change button if text align is not already left
    if (this.#btn.container.style.textAlign != 'left') {
      this.#btn.container.value = '';
      this.#btn.container.style.textAlign = 'left';
    }
  }
}

export class pageBtn {
  #pageName;
  #parent;
  container;
  constructor(pageName) {
    this.#pageName = pageName;
    this.#parent = document.getElementById('sideBar');
    this.container = new btn(this.#pageName).container;

    this.#parent.append(this.container);

    this.container.addEventListener('click', () => {
      let currPageName = document.getElementById('currentPage');
      currPageName.textContent = this.#pageName;

      // todo check if page is already open

      const userData = JSON.parse(decodeURIComponent(getAccount()));

      if (pageName == 'View All') {
        viewAll(userData.id);
        return;
      }

      loadPage(getAccount(), this.#pageName);
    });
  }
}

async function loadPage(userId, pageName) {
  const page  = await fetchPage(userId, pageName);
  const nodes = page.page.nodes;
  clearPage();
  displayNodes(nodes);
  new createNodeBtn();
}

export async function loadUserPages(userId) {
  const userPages = (await searchPages(userId)).pages;

  // create default button to view all listings
  new pageBtn('View All');

  // loop through users pages and create buttons
  userPages.forEach(element => {
    console.log(element);
    new pageBtn(element.title);
  });
}

export function displayNodes(nodes, container=document.getElementById('content')) {
  nodes.forEach(node => {
    console.log(node);
    console.log(container);
    new Node(container, node.title, node.desc, "", "", 0);
    // todo recursively call function to display any nodse within a node
  });
}

export async function viewAll(userId) {
  const contentContainer = document.getElementById('content');
  const userPages = (await searchPages(userId)).pages;

  // loop through users pages
  userPages.forEach(async page => {
    // search for pages that have the current page as its owner
    const pageListings = (await searchListings(page._id)).listings;

    // search for listings that have the current page as its parent
    pageListings.forEach(listing => {
      
      // display each listing that is found
      const currentPage = new Node(contentContainer, `${listing.title}`, '', '', false, -1);
    });
  });
}

/*
export async function viewAll(userId) {
  const userData  = await searchUser(userId);
  const userPages = userData.pages;

  clearPage();
  console.log(userData);
  console.log(userData.pages);

  userPages.forEach(page => {
    console.log(page.title);
    const contentContainer = document.getElementById('content');
    const currentPage = new Node(contentContainer, `${page.title}`, '', '', false, -1);
    displayNodes(page.nodes, currentPage.container);
  });

  console.log(userData.pages[0]);
  console.log(userData.pages[0].nodes);
  console.log(userData.pages[0].nodes[0]);
  console.log(userData.pages[0].nodes[1]);
}*/

function clearPage() {
  let content = document.getElementById('content');
  content.innerHTML = ''; // remove all html inside element
}
