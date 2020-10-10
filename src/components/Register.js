import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const {
    onRegister
  } = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // колбек сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(password, email);
  }

  return(
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <p className="register__title">Регистрация</p>
        <input
          type="email"
          className="register__input"
          placeholder="Email"
          onChange={(evt) => setEmail(evt.target.value)}
          required
          minLength='5'
          maxLength='40'
        />

        <input
          type="password"
          className="register__input"
          placeholder="Пароль"
          onChange={(evt) => setPassword(evt.target.value)}
          required
          minLength='5'
          maxLength='20'
        />

        <button className="register__submit-button" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__link-container">
        <p className="register__text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="register__link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;
