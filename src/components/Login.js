import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login(props) {
  const {
    onLogin
  } = props;

  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // колбек сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault()
    if (!email || !password) {
      return;
    }

    onLogin(password, email)
      .then(() => {
        setEmail('');
        setPassword('');
        history.push('/')
      })
      .catch(err => console.log(err));
  }

  return(
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <p className="register__title">Вход</p>
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
        <button className="register__submit-button" type="submit">Войти</button>
      </form>
      <div className="register__link-container">
        <p className="register__text">Ещё не зарегистрированы?&nbsp;</p>
        <Link to="/sign-up" className="register__link">Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;
