import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const {
    onRegister,
    handleChange,
    values,
    error,
    isFormValid,
  } = props;

  // колбек сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.registerPassword, values.registerEmail);
  }

  // отключение кнопки
  const submitButton = `${
    isFormValid ? 'register__submit-button' : 'register__submit-button register__submit-button_disabled'
  }`;

  return(
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <p className="register__title">Регистрация</p>
        <input
          name="registerEmail"
          type="email"
          className="register__input"
          placeholder="Email"
          onChange={handleChange}
          value={values.registerEmail || ''}
          required
          minLength='5'
          maxLength='40'
        />
        <span className="popup__input-register_error_active">
          {error.registerEmail || ''}
        </span>
        <input
          name="registerPassword"
          type="password"
          className="register__input"
          placeholder="Пароль"
          onChange={handleChange}
          value={values.registerPassword || ''}
          required
          minLength='10'
          maxLength='20'
        />
        <span className="popup__input-register_error_active">
          {error.registerPassword || ''}
        </span>
        <button className={submitButton} type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__link-container">
        <p className="register__text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="register__link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;
