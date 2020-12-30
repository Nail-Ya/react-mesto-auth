import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateUser,
    isLoading,
    buttonText,
    buttonTextLoading,
    handleChange,
    values,
    error,
    isFormValid,
  } = props;

  // колбек для события onSubmit формы изменения данных профиля
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения инпутов во внешний обработчик в App где идет работа с API
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  // отключение кнопки
  const submitButton = `${
    isFormValid ? 'popup__button' : 'popup__button popup__button_disabled'
  }`;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='edit_profile'
      onSubmit={handleSubmit}
    >
      <p className="popup__text">Редактировать профиль</p>
      <input
        name= "name"
        id="name-input"
        type="text"
        onChange={handleChange}
        value={values.name || ''}
        className="popup__input popup__input_edit_name"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        pattern="[A-Za-z А-ЯЁа-яё -]{1,}"
      />
      <span
        id="name-input-error"
        className="popup__input_error_active"
        >
        {error.name || ''}
      </span>
      <input
        name= "about"
        id="job-input"
        type="text"
        onChange={handleChange}
        value={values.about || ''}
        className="popup__input popup__input_edit_job"
        placeholder="Род деятельности"
        required
        minLength="2"
        maxLength="200"
      />
      <span
        id="job-input-error"
        className="popup__input_error_active"
        >
        {error.about || ''}
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

export default EditProfilePopup;
