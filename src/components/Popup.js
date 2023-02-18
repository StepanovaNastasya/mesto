export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector('.popup__close');
  }

  _handleEscClose(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }

  _handleClickOutside(event) {
    const target = event.target;
    if (target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    this.popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this.popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', this.close.bind(this));
    window.addEventListener('keydown', this._handleEscClose.bind(this));
    window.addEventListener('click', this._handleClickOutside.bind(this));
  }

  removeEventListeners() {
    this.closeButton.removeEventListener('click', this.close.bind(this));
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
    window.removeEventListener('click', this._handleClickOutside.bind(this));
  }
}