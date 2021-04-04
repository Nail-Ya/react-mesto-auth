import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login(props) {
  const {
    onLogin,
    handleChange,
    values,
    error,
    isFormValid,
  } = props;

  const history = useHistory();

  // колбек сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault()
    onLogin(values.loginPassword, values.loginEmail)
      .then(() => {
        history.push('/')
      })
      .catch(err => console.log(err));
  }

  // отключение кнопки
  const submitButton = `${
    isFormValid ? 'register__submit-button' : 'register__submit-button register__submit-button_disabled'
  }`;

  return(
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <p className="register__title">Вход</p>
        <input
          name="loginEmail"
          type="email"
          className="register__input"
          placeholder="Email"
          onChange={handleChange}
          value={values.loginEmail || ''}
          required
          minLength='5'
          maxLength='40'
        />
        <span className="popup__input-register_error_active">
          {error.loginEmail || ''}
        </span>
        <input
          name="loginPassword"
          type="password"
          className="register__input"
          placeholder="Пароль"
          onChange={handleChange}
          value={values.loginPassword || ''}
          required
          minLength='5'
          maxLength='20'
        />
        <span className="popup__input-register_error_active">
          {error.loginPassword || ''}
        </span>
        <button className={submitButton} type="submit">Войти</button>
      </form>
      <div className="register__link-container">
        <p className="register__text">Ещё не зарегистрированы?&nbsp;</p>
        <Link to="/sign-up" className="register__link">Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;
