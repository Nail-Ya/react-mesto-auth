import React from 'react';
import logo from './../images/logo.svg';
import { Link, Switch, Route } from 'react-router-dom';

function Header(props) {
  const {
    userEmail,
    onSignOut
  } = props;

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип место"
        className="header__logo"
      />

      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/">
          <div className="header__info">
            <p className="header__email">{userEmail}</p>
            <Link
              to="/sign-in"
              className="header__link header__link_dim"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
