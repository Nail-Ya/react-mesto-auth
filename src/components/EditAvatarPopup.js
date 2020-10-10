import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading,
    buttonText,
    buttonTextLoading
  } = props;

  const inputRef = React.useRef();

  // колбек для события onSubmit формы изменения аватара пользователя
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения инпутов во внешний обработчик в App где идет работа с API
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  // убрать данные из инпута при повторном открытии попапа
  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

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
        ref={inputRef}
        id="avatar-input"
        type="url"
        className="popup__input popup__input_avatar_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        id="avatar-input-error"
        className="popup__input_error_active"
      />
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

export default EditAvatarPopup;






