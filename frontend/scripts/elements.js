import { plusIcon, editIcon, crossIcon } from "./icons.js";

export function titleElement(titleContent) {
  const title = document.createElement('a');
  title.className   = 'title';
  title.textContent = titleContent;

  return title;
}

export function descElement(descContent) {
  const desc = document.createElement('a');
  desc.className   = 'desc';
  desc.textContent = descContent;

  return desc;
}

export function tickboxElement(ticked) {
  const tickbox = document.createElement('input');
  tickbox.type = 'checkbox';
  tickbox.className = 'tickbox';
  tickbox.checked = ticked;
  tickbox.disabled = true;

  return tickbox;
}

export class optionsBar {
  #container
  #addBtn
  #editBtn
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'optionsBar';
    
    this.addBtn   = plusIcon();
    this.editBtn  = editIcon();
    this.crossBtn = crossIcon();
    
    this.container.append(this.editBtn);
    this.container.append(this.addBtn);
    this.container.append(this.crossBtn);
  }
}
