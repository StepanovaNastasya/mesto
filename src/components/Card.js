export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleMakeLike) {
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likesUserIds = data.likesUserIds;
    this._currentUserId = data.currentUserId;
    this._isOwned = data.onwerId == data.currentUserId;
    this._element = document.querySelector(templateSelector).content.firstElementChild.cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleMakeLike = handleMakeLike;
  }

  _prepareTemplate() {
    this._element.querySelector('.elements-grid__title').textContent = this._name;  

    const elementImage = this._element.querySelector('.elements-grid__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;

    this._likesCounter = this._element.querySelector('.elements-grid__likecount');
    this._syncLikesCounter();

    if (!this._isOwned) {
      const trash = this._element.querySelector('.elements-grid__trash');
      trash.remove();
    }

    this._likeButton = this._element.querySelector('.elements-grid__button');
    this._syncLikeButton();
  }

  _addListeners() {
    this._element.querySelector('.elements-grid__button').addEventListener('click', () => this._makeLike());
    this._element.querySelector('.elements-grid__image').addEventListener('click', () => this._openFullImagePopup());
    if (this._isOwned) {
      this._element.querySelector('.elements-grid__trash').addEventListener('click', () => this._handleDeleteClick(this));
    }
  }
  
  data() {
    return {
      'id': this._id,
      'name': this._name,
      'link': this._link
    };
  }

  render() {
    this._prepareTemplate();
    this._addListeners();
    return this._element;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  _makeLike() {
    this._handleMakeLike(this._isLiked())
      .then(card => {
        this._likesUserIds = card.likesUserIds;
        this._syncLikeButton();
        this._syncLikesCounter();
      })
      .catch((err) => console.log(err));
  } 
  
  _openFullImagePopup() {
    this._handleCardClick(this._name, this._link);
  }

  _syncLikesCounter() {
    this._likesCounter.textContent = this._likesUserIds.length;
  }

  _syncLikeButton() {
    if (this._isLiked()) {
      this._likeButton.classList.add('selected');
    } else {
      this._likeButton.classList.remove('selected');
    }
  }

  _isLiked() {
    return this._likesUserIds.includes(this._currentUserId);
  }
}