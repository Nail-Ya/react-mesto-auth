import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateUser,
    isLoading,
    buttonText,
    buttonTextLoading
  } = props;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // колбек для события onChange поля ввода имени
  function handleNameChange(e) {
    setName(e.target.value);
  }

  // колбек для события onChange поля ввода профессии
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // после загрузки текущего пользователя из API
  // его данные будут использованы в полях ввода
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // колбек для события onSubmit формы изменения данных профиля
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения инпутов во внешний обработчик в App где идет работа с API
    onUpdateUser({
      name: name,
      about: description
    });
  }

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
        value={name}
        onChange={handleNameChange}
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
      />
      <input
        name= "about"
        id="job-input"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_edit_job"
        placeholder="Род деятельности"
        required
        minLength="2"
        maxLength="200"
      />
      <span
        id="job-input-error"
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

export default EditProfilePopup;
