export class Card {
  constructor(name, link, templateSelector, openFullImagePopupCallback) {
    this._name = name;
    this._link = link;
    this._template = document.querySelector(templateSelector).content;
    this._openFullImagePopupCallback = openFullImagePopupCallback;
  }

  _getTemplate() {
    const elementItem  = this._template.cloneNode(true);
    const elementImage = elementItem.querySelector('.elements-grid__image');

    elementItem.querySelector('.elements-grid__title').textContent = this._name;  
    elementImage.src = this._link;
    elementImage.alt = this._name; 

    return elementItem;
  }

  _addListeners(elementItem) {
    elementItem.querySelector('.elements-grid__button').addEventListener('click', this._makeLike);
    elementItem.querySelector('.elements-grid__trash').addEventListener('click', this._deleteCard);
    elementItem.querySelector('.elements-grid__image').addEventListener('click', () => {
      this._openFullImagePopup();
    });
  }
  
  render() {
    const elementItem = this._getTemplate();
    this._addListeners(elementItem);
    return elementItem;
  }

  _makeLike(evt) {
    const likeButton = evt.target;
  
    likeButton.classList.toggle("selected");
  } 
  
  _deleteCard(evt) {
    evt.target.closest('.elements-grid__item').remove();
  }
  
  _openFullImagePopup() {
    this._openFullImagePopupCallback(this._name, this._link);
  }
}