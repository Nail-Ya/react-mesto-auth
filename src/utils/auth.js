import {BASE_URL} from './utils.js'

// отправка запроса на регистрацию
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
  .then((response) => {
    if (!response.ok){
      return response.json()
        .then((err) => {
          throw new Error(err.message);
        })
    }
    return response.json();
  })
}

// отправка запроса на логин
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email }),
  })
  .then(response => {
    if (!response.ok){
      return response.json()
        .then((err) => {
          throw new Error(err.message);
        })
    }
    return response.json();
  })
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};

// отправка запроса для получения данных пользователя
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => data)
}
