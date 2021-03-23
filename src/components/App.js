import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {api} from './../utils/api.js';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';
import successPopupIcon from './../images/successPopupIcon.svg';
import errorPopupIcon from './../images/errorPopupIcon.svg';
import loader from './../images/loaderPopup.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [cardToDelete, setCardToDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({
    isImagePopupOpen: false,
    link: '',
    name: '',
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about:''
  });
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [popupInfo, setPopupInfo] = React.useState({
    iconPath: loader,
    popupMessage: ''
  });

  const [token, setToken] = React.useState(localStorage.getItem('jwt'));

  const history = useHistory();

  // Валидация форм
  // state переменные для валидации формы
  const [values, setValues] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [error, setError] = React.useState({});

  // функция валидации формы: отслеживает инпуты и отображает ошибку
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest('form').checkValidity());
  }

  // функция сбрасывает ошибки при закрытии попапа/сабмита формы
  function resetForm() {
    setValues({});
    setIsFormValid(false);
    setError({});
  }

  // Хук для проверки токена при каждом монтировании компонента App
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    }
  }, [history]);

  // Получить данные пользователя
  React.useEffect(() => {
    setIsLoading(true);
    api
      .getUserInfo(token)
      .then(data => {
        setCurrentUser(data.data);
      })
      .catch(err => console.log(`Ошибка: ${err.message}`))
      .finally(() => {
        setIsLoading(false);
      });
  },[token]);

  // Получить массив карточек из сервера
  React.useEffect(() => {
    setIsLoading(true);
    api
      .getInitialCards(token)
      .then(data => {
        setCards(data)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  },[token]);

  // Закрытие попапов при клике на Esc и на overlay
  React.useEffect(() => {
    // закрыть попап при клике на Esc
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    // закрыть попап при клике на overlay
    function closeByOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlay);
    }
  });

  // Колбек для открытия DeleteCardPopup
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(card)
  }

  // Колбек для открытия EditProfilePopup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Колбек для открытия EditAvatarPopup
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Колбек для открытия EditProfilePopup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Колбек для открытия ImagePopup
  function handleCardClick(card) {
    setSelectedCard({
      isImagePopupOpen: true,
      link: card.link,
      name: card.name
    });
  }

  // Закрыть все попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      isImagePopupOpen: false,
      link: '',
      name: ''
    });
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setPopupInfo({
      iconPath: loader,
      popupMessage: ''
    });
    resetForm();
  }

  // Обновить данные пользователя
  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .updateUserInfo(userData, token)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  // Обновить аватар
  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api
      .updateUserAvatar(userData, token)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  // Поставить/убрать лайк карточке
  function handleCardLike(card) {
    // Проверить, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправить запрос в API и получить обновлённые данные карточки
    api
      .changeLikeCardStatus(card, !isLiked, token)
      .then((newCard) => {
        // Сформировать новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((item) => item._id === card._id ? newCard : item);
        // Обновить стейт
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Удалить карточку
  function handleCardDelete() {
    setIsLoading(true);
    api
      .deletePhoto(cardToDelete, token)
      .then(() => {
        // Сформировать новый массив на основе имеющегося, без удаленной карточки
        const newCards = cards.filter((item) => item !== cardToDelete);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  // Добавить карточку
  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .addNewCard(newCard, token)
      .then((newCardData) => {
        setCards([newCardData, ...cards]);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  // Регистрация пользователя
  function handleUserRegister(password, email) {
    return auth.register(password, email)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setPopupInfo({
            iconPath: successPopupIcon,
            popupMessage: 'Вы успешно зарегистрировались!'
          })
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err)
        setIsInfoTooltipOpen(true);
        setPopupInfo({
          iconPath: errorPopupIcon,
          popupMessage: err.message
        })
      })
  }

  // Логин пользователя
  function handleLogin(password, email) {
    return auth.authorize(password, email)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }
        setToken(data.token);
        auth.getContent(data.token)
          .then((res) => {
            setUserEmail(res.data.email);
          })
          .catch(err => console.log(err));

        if (data.token) {
          setPopupInfo({
            iconPath: successPopupIcon,
            popupMessage: 'Вы успешно вошли!'
          })
          setLoggedIn(true);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setPopupInfo({
          iconPath: errorPopupIcon,
          popupMessage: err.message
        })
        setIsInfoTooltipOpen(true);
      })
  }

  // Выход пользователя из системы
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserEmail('');
    history.push('/sign-up');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeletePopup={handleDeleteCardClick}
            isLoading={isLoading}
          />

          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
              error={error}
              values={values}
              isFormValid={isFormValid}
              handleChange={handleChange}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              onRegister={handleUserRegister}
              error={error}
              values={values}
              isFormValid={isFormValid}
              handleChange={handleChange}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <section className="popups">
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            popupInfo={popupInfo}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            buttonText={'Сохранить'}
            buttonTextLoading={'Сохранение...'}
            error={error}
            values={values}
            isFormValid={isFormValid}
            handleChange={handleChange}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
            isLoading={isLoading}
            buttonText={'Добавить'}
            buttonTextLoading={'Сохранение...'}
            error={error}
            values={values}
            isFormValid={isFormValid}
            handleChange={handleChange}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            buttonText={'Изменить'}
            buttonTextLoading={'Сохранение...'}
            error={error}
            values={values}
            isFormValid={isFormValid}
            handleChange={handleChange}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            onConfirmDelete={handleCardDelete}
            buttonText={'Удалить'}
            buttonTextLoading={'Удаление...'}
          />
        </section>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
