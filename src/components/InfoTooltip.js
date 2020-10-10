import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip(props) {
  const {
    isOpen,
    onClose,
    popupInfo
  } = props;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='infoTooltip'
    >
    <img src={popupInfo.iconPath} alt="Картинка авторизации" className="popup__icon" />
    <p className="popup__text popup__text_type_tooltip">{popupInfo.popupMessage}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
