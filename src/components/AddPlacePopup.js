import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const {
    isOpen,
    onClose,
    onAddCard,
    isLoading,
    buttonText,
    buttonTextLoading
  } = props;

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  // колбек для события onSubmit формы добавления карточки
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения инпутов во внешний обработчик в App где идет работа с API
    onAddCard({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  // убрать данные из инпута при повторном открытии попапа
  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  return(
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='add_place'
      onSubmit={handleSubmit}
    >

      <p className="popup__text">Новое место</p>
      <input
        name="name"
        ref={nameRef}
        id="title-input"
        type="text"
        className="popup__input popup__input_place_name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span
        id="title-input-error"
        className="popup__input_error_active"
      />
      <input
        name="link"
        ref={linkRef}
        id="url-input"
        type="url"
        className="popup__input popup__input_place_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        id="url-input-error"
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

export default AddPlacePopup;
