import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading,
    buttonText,
    buttonTextLoading,
    handleChange,
    values,
    error,
    isFormValid,
  } = props;

  // колбек для события onSubmit формы изменения аватара пользователя
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения инпутов во внешний обработчик в App где идет работа с API
    onUpdateAvatar({
      avatar: values.avatar,
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
      name='change_avatar'
      onSubmit={handleSubmit}
    >
      <p className="popup__text">Обновить аватар</p>
      <input
        name="avatar"
        id="avatar-input"
        type="url"
        className="popup__input popup__input_avatar_link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.avatar || ''}
      />
      <span
        id="avatar-input-error"
        className="popup__input_error_active"
      >
        {error.avatar || ''}
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

export default EditAvatarPopup;






