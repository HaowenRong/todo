import { node } from './nodes.js';
import { plusIcon } from './icons.js';

export function createForm(title, desc, color, inputType="newCatInput") {
  const formContainer = document.createElement("div");
  formContainer.className = "newItemContainer";

  const formTitle = document.createElement("input");
  formTitle.type = "text";
  formTitle.placeholder = "Enter the name of the item";
  formTitle.value = title;
  formTitle.className = inputType;

  const formDesc = document.createElement("input");
  formDesc.type = "text";
  formDesc.placeholder = "Enter a description for the item. (Optional)";
  formDesc.value = desc;
  formDesc.className = inputType;

  const formColor = document.createElement("input");
  formColor.type = "text";
  formColor.placeholder = "(WIP) Enter the color of the item. (Optional)";
  formColor.value = color;
  formColor.className = inputType;

  const formCloseBtn = document.createElement("input");
  formCloseBtn.type = "button";
  formCloseBtn.className = "catFormBtn";
  formCloseBtn.value = "Cancel";

  const formSubmitBtn = document.createElement("input");
  formSubmitBtn.type = "button";
  formSubmitBtn.className = "catFormBtn";
  formSubmitBtn.value = "Submit";

  formContainer.append(formTitle);
  formContainer.append(formDesc);
  formContainer.append(formColor);
  formContainer.append(formCloseBtn);
  formContainer.append(formSubmitBtn);

  return {
    container: formContainer,
    title: formTitle,
    desc: formDesc,
    color: formColor,
    submitBtn: formSubmitBtn,
    closeBtn: formCloseBtn
  }
}

export class createNodeBtn {
  #container;
  #icon;
  #expanded;
  #form;

  constructor() {
    this.init();
  }

  init() {
    this.expanded = false;

    this.container = document.createElement("div");
    this.container.className = "addCatFormContainer";
    this.container.addEventListener('click', () => {
      this.expand();
    });

    this.icon = plusIcon();

    this.container.append(this.icon);

    const contentContainer = document.getElementById("content");
    contentContainer.append(this.container);
  }

  expand() {
    if (this.expanded == true) { return; }
    this.expanded = true;
    this.form = createForm("", "", "");

    setTimeout(() => {
      this.container.removeChild(this.icon);
      this.container.classList.toggle("addCatFormContainerExpanded");
      this.container.append(this.form.container);
      this.form.title.focus();
      this.form.closeBtn.addEventListener('click', () => {
        this.removeSelf();
        new createNodeBtn();
      });

      this.form.submitBtn.addEventListener('click', () => {
        const formTitleValue = (this.form.title.value).trim();
        const formDescValue = (this.form.desc.value).trim();
        if (formTitleValue === "") {
          this.form.title.focus();
          return;
        }
        const contentContainer = document.getElementById("content");
        new node(contentContainer, formTitleValue, formDescValue, "", "", -1).container;

        this.reAppend();
      });
    }, 100);
    
  }

  removeSelf() {
    const contentContainer = document.getElementById("content");
    contentContainer.removeChild(this.container);
  }

  // function to remove self and append new instance of class at the bottom of the content
  reAppend() {
    this.removeSelf();
    new createNodeBtn();
  }
}

export class popupView {
  constructor(content) {
    const background = document.createElement("div");
    background.className = "addCatFormPopupBackground";
    document.body.appendChild(background);
    document.body.style.overflow = "hidden";

    background.addEventListener("click", function() {
      document.body.removeChild(background);
      document.body.removeChild(form);
      document.body.style.overflow = "auto";
    });

  const form = document.createElement("div");
  form.className = "addCatFormPopup";
  document.body.appendChild(form);

  }
}
