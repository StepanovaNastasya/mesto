import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this.submit = submit;
    this.form = this.popup.querySelector('.form');
    this.inputs = this.form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    return this.inputs.map(input => {
      return input.value;
    });
  }
  
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.form.removeEventListener('submit', this.submit);
  }

  close() {
    super.close();
    this.inputs.forEach(input => {
      input.value = "";
    });
    this.form.reset();
  }
}