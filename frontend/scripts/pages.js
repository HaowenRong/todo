import { node } from './nodes.js';

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

