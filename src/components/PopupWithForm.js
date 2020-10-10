import React from 'react';

function PopupWithForm(props) {
  const {
    name,
    isOpen,
    children,
    onClose,
    onSubmit,
  } = props;

  return (
    <div className={`popup popup_${name} ` + (isOpen && 'popup_opened')}>
      <form
        className={`popup__form popup__form_${name}`}
        name={name}
        onSubmit={onSubmit}
      >
        {children}
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
      </form>
    </div>
  );
}

export default PopupWithForm;
