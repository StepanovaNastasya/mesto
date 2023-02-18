export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._element = document.querySelector(templateSelector).content.firstElementChild.cloneNode(true);
    this._handleCardClick = handleCardClick;
  }

  _prepareTemplate() {
    this._element.querySelector('.elements-grid__title').textContent = this._name;  

    const elementImage = this._element.querySelector('.elements-grid__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
  }

  _addListeners() {
    this._element.querySelector('.elements-grid__button').addEventListener('click', (evt) => this._makeLike(evt));
    this._element.querySelector('.elements-grid__trash').addEventListener('click', () => this._deleteCard());
    this._element.querySelector('.elements-grid__image').addEventListener('click', () => this._openFullImagePopup());
  }
  
  render() {
    this._prepareTemplate();
    this._addListeners();
    return this._element;
  }

  _makeLike(evt) {
    const likeButton = evt.target;
  
    likeButton.classList.toggle("selected");
  } 
  
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  
  _openFullImagePopup() {
    this._handleCardClick(this._name, this._link);
  }
}