import {BASE_URL} from './utils.js'

class Api {
  constructor() {
    this._url = BASE_URL;
  }

  // метод для обработки ответов от сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  }

 // получение карточек из сервера
 getInitialCards(token) {
  return fetch(`${this._url}/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(this._handleResponse)
}

  // получение данных пользователя
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._handleResponse)
  }

  // обновление информации о пользователе
  updateUserInfo(newUserInfo, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about
      })
    })
    .then(this._handleResponse)
  }

  // добавление новой карточки
  addNewCard(newCard, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
    .then(this._handleResponse)
  }

  // удаление фото
  deletePhoto(card, token) {
    return fetch(`${this._url}/cards/${card._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._handleResponse)
  }

  // обновление аватара профиля
  updateUserAvatar(inputValue, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: inputValue.avatar
      })
    })
    .then(this._handleResponse)
  }

  // поставить / убрать лайк: 2 разных метода запроса для удаления и постановки лайка
  changeLikeCardStatus(card, like, token) {
    return fetch(`${this._url}/cards/${card._id}/likes/`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._handleResponse)
  }
}

export const api = new Api();
