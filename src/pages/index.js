import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDeletionButton } from '../components/PopupWithDeletionButton.js';
import { UserInfo } from '../components/UserInfo.js';
import {
    formEditProfile,
    formAddCard,
    formRedactAvatar,
    openRedactAvatarPopupBtn,
    openEditProfilePopupBtn,
    openAddCardPopupBtn,
    popupProfileRedact,
    popupAvatarRedact,
    popupAddNewCard,
    selectorsAll
} from '../utils/constants.js';

//validations
const cardEditProfile = new FormValidator(selectorsAll, formEditProfile);
const cardAdd = new FormValidator(selectorsAll, formAddCard);
const cardRedactAvatar = new FormValidator(selectorsAll, formRedactAvatar);
cardEditProfile.enableValidation();
cardRedactAvatar.enableValidation();
cardAdd.enableValidation();
cardAdd.toggleButtonState();

const popupEditProfile = new PopupWithForm('.popup_type_redact', formEditProfileSubmitHandler);
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
const popupRedactAvatar = new PopupWithForm('.popup_type_redact-avatar', submitRedactAvatarForm);
const popupDeletion = new PopupWithDeletionButton('.popup_type_deletion', deleteCardFromServer);
const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(selectorsAll);

const addSection = new Section({
        renderer: (item) => {
            addSection.addItem(renderCard(item));
        }
    },
    selectorsAll.elements
);
//initial card from server
initCardsFromServer();

function formEditProfileSubmitHandler(evt, data) {
    evt.preventDefault();
    renderLoading(true, popupProfileRedact);
    userInfo.setUserInfo(data);
    loadingUserInfoOnServer();
    popupEditProfile.closePopup();
};

function renderCard(item) {
    const card = new Card(
        item,
        '#card-template',
        handleCardClick,
        openPopupDeletion,
        buttonDeleteCard,
        dislikeCards,
        likeCards);
    const cardElement = card.generateCard();
    return cardElement;
}

//initial delele card
function buttonDeleteCard(element, cardId) {
    popupDeletion.deleteEventListener(element, cardId);
    popupDeletion.closePopup();
}
//open popup for delele card
function openPopupDeletion() {
    popupDeletion.openPopup();
}
//redact avatar
function submitRedactAvatarForm(evt, data) {
    evt.preventDefault();
    renderLoading(true, popupAvatarRedact);
    userInfo.setAvatarLink(data);
    loadingNewAvatarOnServer()
    popupRedactAvatar.closePopup();
    cardRedactAvatar.toggleButtonState();
}
//initial new card
function submitAddCardForm(evt) {
    evt.preventDefault();
    renderLoading(true, popupAddNewCard);
    loadingNewCardOnServer();
    popupAddCard.closePopup();
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
}

openEditProfilePopupBtn.addEventListener('click', function() {
    const data = userInfo.getUserInfo();
    const nameInput = document.querySelector('.form__input_type_name');
    const jobInput = document.querySelector('.form__input_type_job');

    nameInput.value = data.name;
    jobInput.value = data.job;
    cardEditProfile.toggleButtonState();
    popupEditProfile.openPopup();
});

openAddCardPopupBtn.addEventListener('click', function() {
    cardAdd.toggleButtonState();
    popupAddCard.openPopup();
});

openRedactAvatarPopupBtn.addEventListener('click', function() {
    cardRedactAvatar.toggleButtonState();
    popupRedactAvatar.openPopup();
});

popupRedactAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupDeletion.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();

//open image
function handleCardClick(elementImage) {
    popupImage.openPopup(elementImage);
}

/////API

function renderError(err) {
    result.textContent = '';
    error.textContent = err;
}


//initial users
fetch('https://nomoreparties.co/v1/cohort-25/users/me', {
        headers: {
            authorization: '3f7400de-4faa-456b-995e-bfe48f676c49'
        }
    })
    .then(res => res.json())
    .then((result) => {
        document.getElementById('name').textContent = result.name;
        document.getElementById('about').textContent = result.about;
        document.getElementById('avatar').src = result.avatar;
    });


//initial card from server
function initCardsFromServer() {
    return fetch('https://nomoreparties.co/v1/cohort-25/cards', {
            headers: {
                authorization: '3f7400de-4faa-456b-995e-bfe48f676c49'
            }
        })
        .then(res => res.json())
        .then(result => {
            addSection.renderItems(result.reverse());
        })
}
//loading info about user on server
function loadingUserInfoOnServer() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector(selectorsAll.infoName).textContent,
                about: document.querySelector(selectorsAll.infoJob).textContent
            })
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupProfileRedact);
        });
};

//loading new cards on server 
function loadingNewCardOnServer() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
            method: 'POST',
            headers: {
                authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector(selectorsAll.infoTitle).value,
                link: document.querySelector(selectorsAll.infoLink).value,
            })
        })
        .then(res => res.json())
        .then(result => {
            addSection.addItem(renderCard(result));
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupAddNewCard);
        });
}


//delete cards from server
function deleteCardFromServer(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-25/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
            }
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        });
}

//like cards
function likeCards(likeId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-25/cards/likes/${likeId}`, {
            method: 'PUT',
            headers: {
                authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
            }
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        });
}

//dislike cards
function dislikeCards(likeId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-25/cards/likes/${likeId}`, {
            method: 'DELETE',
            headers: {
                authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
            }
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        });
}

//loading new avatar on server
function loadingNewAvatarOnServer() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: document.querySelector(selectorsAll.infoAvatar).src
            })
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupAvatarRedact);
        });
};
//good UX


function renderLoading(isLoading, popup) {
    if (isLoading) {
        popup.querySelector('.form__loading').classList.add('form__loading_visible');
        popup.querySelector('.form__save-button').classList.add('form__save-button_hidden');
    } else {
        popup.querySelector('.form__loading').classList.remove('form__loading_visible');
        popup.querySelector('.form__save-button').classList.remove('form__save-button_hidden');
    }
}

/*
если isLoading равен true, 
элементу spinner нужно добавить класс spinner_visible,
 а элементу content — класс content_hidden
  (это нужно, чтобы скрыть этот блок пока идёт загрузка);
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  function renderLoading(isLoading){
   if (isLoading) {
    spinner.classList.add('spinner_visible');
    content.classList.add('content_hidden');
  } else {
    spinner.classList.remove('spinner_visible');
    content.classList.remove('content_hidden');
  }
} 
 */