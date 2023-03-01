import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this.submit = submit;
    this.form = this.popup.querySelector('.form');
    this.inputs = this.form.querySelectorAll('.form__input');
    this.button = this.form.querySelector('.form__savebutton');
  }

  _getInputValues() {
    const result = {};
    this.inputs.forEach(input => {
      result[input.name] = input.value;
    });
    return result;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()

      const buttonOldText = this.button.textContent;
      this.button.textContent = 'Сохранение...'

      this.submit(this._getInputValues())
        .then(skipped => this.button.textContent = buttonOldText);
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}