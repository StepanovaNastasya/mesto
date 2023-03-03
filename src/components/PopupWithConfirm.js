import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this.submit = submit;
    this.form = this.popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.submit(this._element);
    });
  }

  open(element) {
    this._element = element;
    super.open();
  }
}