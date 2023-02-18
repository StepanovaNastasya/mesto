export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
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
    window.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', this.close.bind(this));
    this.popup.addEventListener('click', this._handleClickOutside.bind(this));
  }
}