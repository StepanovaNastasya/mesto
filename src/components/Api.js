export class Api {
  constructor(config) {
    this._token = config.token;
    this._cohortId = config.cohortId;
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token
      }
    })
    .then(response => this._getJsonOrReject(response))
    .then(json => this._convertJsonToUserInfo(json));
  }

  updateUserInfoTextContent(updatedUserInfo) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: updatedUserInfo.name,
        about: updatedUserInfo.profession
      })
    })
    .then(response => this._getJsonOrReject(response))
    .then(json => this._convertJsonToUserInfo(json));
  }

  updateUserInfoAvatar(updatedUserInfo) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: updatedUserInfo.avatar
      })
    })
    .then(response => this._getJsonOrReject(response))
    .then(json => this._convertJsonToUserInfo(json));
  }

  getAllCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token
      }
    })
    .then(response => this._getJsonOrReject(response))
    .then(json => json.map((item) => this._convertJsonToCard(item)));
  }

  addLike(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${card.id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(response => this._getJsonOrReject(response))
    .then(json => this._convertJsonToCard(json));
  }

  removeLike(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${card.id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(response => this._getJsonOrReject(response))
    .then(json => this._convertJsonToCard(json));
  }

  addCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(response => this._getJsonOrReject(response))
    .then(json => this._convertJsonToCard(json));
  }

  deleteCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${card.id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(response => this._rejectIfNotOk(response));
  }

  _getJsonOrReject(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  _rejectIfNotOk(response) {
    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  _convertJsonToUserInfo(json) {
    return {
      'id': json._id,
      'name': json.name, 
      'profession': json.about, 
      'avatar': json.avatar
    }
  }

  _convertJsonToCard(json) {
    return {
      'id': json._id,
      'name': json.name, 
      'link': json.link,
      'likesUserIds': json.likes.map(it => it._id),
      'onwerId': json.owner._id
    }
  }
}