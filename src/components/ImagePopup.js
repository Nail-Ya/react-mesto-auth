import React from 'react';

function ImagePopup(props) {
  const {
    card,
    onClose
  } = props;

  return (
    <div className={"popup popup_open_image " + (card.isImagePopupOpen && "popup_opened")}>
      <div className="popup__container">
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <p className="popup__image-name">
          {card.name}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;
