import { titleElement,
         descElement,
         tickboxElement,
         optionsBar } from "./elements.js";

import { createForm } from "./form.js";


export class node {
  #parent
  #container
  #title;
  #desc;
  #descSeperator;
  #color;
  #tickbox;
  #layer;
  #optionsBar;
  #form;
  #formOpened
  #catSeperator
  constructor(parent, title, desc, color, ticked, layer) {
    this.parent = parent;
    this.layer  = layer;
    this.title = titleElement(title);
    this.desc = descElement(desc);
    this.descSeperator = document.createElement("hr");
    this.descSeperator.className = "titleSeperator";
    this.tickbox = tickboxElement(ticked);
    this.optionsBar = new optionsBar();

    this.init();
  }
  init() {
    this.container = document.createElement('div');
    this.container.className = this.checkLayer(this.layer); // todo - update function?
    this.container.draggable = true;

    this.container.ondragstart = (event) => {
      if (event.target === this.container) {
        console.log(event.target);
        console.log("drag started");
      }
    }
    this.container.ondragend = (event) => {
      if (event.target !== this.container) {
        return;
      }
      const element = document.elementFromPoint(event.clientX, event.clientY);

      console.log("drag end");
      //console.log(event.target);
      console.log("Element under cursor:", element);

      if (element.className == 'category'
      ||  element.classList.contains('item')) {
        element.append(this.container);
      }

    }
    /*
    notes: update layer on move
    */

    this.container.append(this.title);
    this.container.append(this.tickbox);

    if (this.desc.textContent != "") {
      this.container.append(this.descSeperator);
      this.container.append(this.desc);
    }

    this.container.append(this.optionsBar.container);

    this.parent.append(this.container);
    if(this.layer == -1) {
      this.catSeperator= document.createElement("hr");
      this.catSeperator.className = "seperator";
      this.parent.append(this.catSeperator);
    }

    this.initTickDetection();
    this.initAddBtnDetection();
    this.initEditDetection();
    // this.initHoverDetection();
    // test(this.container);
    this.initDeleteDection();
  }

  checkLayer(layer) {
    if (layer == -1) { return "category"; }
    const layerOdd = layer % 2;
    if (layerOdd == 1) { return "item itemWhite"; }
    else               { return "item itemGray";	}
  }

  initTickDetection() {
    this.container.addEventListener('click', (event) => {
      if (event.target == this.container || event.target == this.tickbox) {
        this.tickbox.checked = !this.tickbox.checked;
        if (this.tickbox.checked) {
          this.title.style.textDecoration = "line-through";
        } else {
          this.title.style.textDecoration = "none";
        }
      }
    });
  }

  initAddBtnDetection() {
    this.optionsBar.addBtn.addEventListener('click', (event) => {
      if (this.formOpened == 1) {
        this.form.title.focus();
        return;
      } else { this.formOpened = 1; }
      
      this.form = createForm("", "", "");
      this.container.append(this.form.container);
      this.form.title.focus();

      this.form.closeBtn.addEventListener('click', () => {
        this.removeForm();
      });

      this.form.submitBtn.addEventListener('click', () => {
        const formTitleValue = (this.form.title.value).trim();
        const formDescValue = (this.form.desc.value).trim();
        if (formTitleValue === "") {
          this.form.title.focus();
          return;
        }
        new node(this.container, formTitleValue, formDescValue, "", "", (this.layer + 1)).container;
        this.removeForm();
        this.optionsBar.container.classList.remove('optionsHover');
      });
    });
  }

  initEditDetection() {
    this.optionsBar.editBtn.addEventListener('click', (event) => {
      if (this.formOpened == 1) {	return;	}

      this.form = createForm(this.title.textContent, this.desc.textContent, "");
      if (this.desc.textContent != "") {
        this.desc.insertAdjacentElement('afterend', this.form.container);
      } else {
        this.title.insertAdjacentElement('afterend', this.form.container);
      }
      this.form.title.focus();

      this.form.closeBtn.addEventListener('click', () => {
        this.removeForm();
      });

      this.form.submitBtn.addEventListener('click', () => {
        const formTitleValue = (this.form.title.value).trim();
        const formDescValue = (this.form.desc.value).trim();
        if (formTitleValue === "") {
          this.form.title.focus();
          return;
        }
        this.removeForm();

        this.title.textContent = formTitleValue;

        if (formDescValue == "" && this.desc.textContent != "") {
          this.removeDesc();
          return;
        }
        if (formDescValue != "" && this.desc.textContent == "") {
          this.appendDesc();
        }
        
        this.desc.textContent = formDescValue;
        this.optionsBar.container.classList.remove('optionsHover');
      });
    });
  }

  initDeleteDection() {
    this.optionsBar.crossBtn.addEventListener('click', () => {
      if (this.layer == -1) {
        this.parent.removeChild(this.catSeperator);
      }
      this.parent.removeChild(this.container);
      // this.popupView("Enter ...");
    });
  }

  initHoverDetection() {
    document.body.addEventListener('mouseover', (event) => {
      console.log(event.target)
      if (event.target === this.container
      || event.target === this.optionsBar.addBtn
      || event.target === this.optionsBar.editBtn
      || event.target === this.optionsBar.crossBtn
      || event.target === this.title
      || event.target === this.desc
      ) {
        this.optionsBar.container.classList.add('optionsHover');
      }

      if (event.target !== this.container) {
        this.optionsBar.container.classList.remove('optionsHover');
      }
      // issues with leaving the element
      /* possible solution to create document body event listener
      rather than sep listeners for each node */
    });
  }

  removeForm() {
    this.container.removeChild(this.form.container);
    this.formOpened = 0;
  }

  appendDesc() {
    this.title.insertAdjacentElement("afterend", this.descSeperator);
    this.descSeperator.insertAdjacentElement("afterend", this.desc);
  }

  removeDesc() {
    this.desc.textContent = "";
    this.container.removeChild(this.descSeperator);
    this.container.removeChild(this.desc);
  }

  popupView(content) {
    const background = document.createElement("div");
    background.className = "addCatFormPopupBackground";

    const formContainer = document.createElement('div');
    formContainer.className = "addCatFormPopup";

    const title = document.createElement('a');
    title.className = 'title';
    title.textContent = content;

    formContainer.append(title);
    background.append(formContainer);
    document.body.append(background);
    document.body.style.overflow = "hidden";

    background.addEventListener("click", function() {
      document.body.removeChild(background);
      document.body.style.overflow = "auto";
    });
  }
}
