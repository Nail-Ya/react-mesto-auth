import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const {
    isOpen,
    onClose,
    onAddCard,
    isLoading,
    buttonText,
    buttonTextLoading,
    handleChange,
    values,
    error,
    isFormValid,
  } = props;

  // колбек для события onSubmit формы добавления карточки
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения инпутов во внешний обработчик в App где идет работа с API
    onAddCard({
      name: values.cardName,
      link: values.cardLink
    });
  }

  // отключение кнопки
  const submitButton = `${
    isFormValid ? 'popup__button' : 'popup__button popup__button_disabled'
  }`;

  return(
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='add_place'
      onSubmit={handleSubmit}
    >

      <p className="popup__text">Новое место</p>
      <input
        name="cardName"
        id="title-input"
        type="text"
        className="popup__input popup__input_place_name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        value={values.cardName || ''}
      />
      <span
        id="title-input-error"
        className="popup__input_error_active"
      >
        {error.cardName || ''}
      </span>
      <input
        name="cardLink"
        id="url-input"
        type="url"
        className="popup__input popup__input_place_link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.cardLink || ''}
      />
      <span
        id="url-input-error"
        className="popup__input_error_active"
      >
        {error.cardLink || ''}
      </span>
      <button
        className={submitButton}
        type="submit">
          {
            isLoading ? buttonTextLoading : buttonText
          }
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
