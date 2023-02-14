import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.image = this.popup.querySelector('.popup__image');
    this.description = this.popup.querySelector('.popup__description');
  }

  open(alt, src) {
    this.image.src = src;
    this.image.alt = alt;
    this.description.textContent = alt;

    super.open();
  }
} 