import React from 'react';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js';

function Card(props) {
  const {
    card,
    onCardClick,
    onCardLike,
    onCardDeletePopup
  } = props;

  // подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  return (
    <div className="element">
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <button
        className={`element__delete-button ${isOwn ? '' : 'element__delete-button_disactive'}`}
        type="button"
        onClick={() => onCardDeletePopup(card)}
      />
      <div className="element__info">
        <p className="element__name">
          {card.name}
        </p>
        <div className="element__like-section">
          <button
            className={`element__like-button ${isLiked ? 'element__like-button_active' : ''}`}
            type="button"
            onClick={() => onCardLike(card)}
          />
          <p className="element__like-counter">
            {card.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
