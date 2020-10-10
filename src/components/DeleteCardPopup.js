import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  const {
    isOpen,
    onClose,
    isLoading,
    onConfirmDelete,
    buttonText,
    buttonTextLoading
  } = props;

  // колбек для события onSubmit формы удаления карточки
  function handleSubmit(e) {
    e.preventDefault();
    // передача события submit во внешний обработчик в App где идет работа с API
    onConfirmDelete();
  }

  return (
    <PopupWithForm
      name='delete_card'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="popup__text">Вы уверены?</p>
      <button
        className="popup__button"
        type="submit">
          {
            isLoading ? buttonTextLoading : buttonText
          }
      </button>
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
