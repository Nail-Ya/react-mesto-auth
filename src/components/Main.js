import React from 'react';
import Card from './Card';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js';
import loadingGif from './../images/loading-gif.gif';

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDeletePopup,
    isLoading
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-section">
          <img
            alt="Фотография пользователя"
            className="profile__avatar-image"
            src={isLoading ? loadingGif : currentUser.avatar}
          />
          <button
            className="profile__avatar-change-button"
            type="button"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">
              {isLoading ? 'Загрузка...' : currentUser.name}
            </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__job">
            {isLoading ? 'Загрузка...' : currentUser.about}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        {cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeletePopup={onCardDeletePopup}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
