import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDeletionButton } from '../components/PopupWithDeletionButton.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
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
const popupDeletion = new PopupWithDeletionButton('.popup_type_deletion', submitDeleteCard);
const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(selectorsAll);

const addSection = new Section({
        renderer: (item) => {
            addSection.addItem(renderCard(item));
        }
    },
    selectorsAll.elements
);

function formEditProfileSubmitHandler(evt, data) {
    evt.preventDefault();
    renderLoading(true, popupProfileRedact);
    userInfo.setUserInfo(data);
    loadingUserInfo();
};

function buttonDeleteCard(card, cardId) {
    popupDeletion.openPopup();
    popupDeletion.deleteEventListener(card, cardId);
};

function renderCard(item) {
    const card = new Card(
        item,
        '#card-template',
        handleCardClick,
        dislikeCard,
        likeCard,
        buttonDeleteCard);
    const cardElement = card.generateCard();
    return cardElement;
}

//initial delele card
function submitDeleteCard(evt, card, cardId) {
    evt.preventDefault();
    deleteServerCard(cardId);
    card.deleteСard();
}
//redact avatar
function submitRedactAvatarForm(evt, data) {
    evt.preventDefault();
    renderLoading(true, popupAvatarRedact);
    userInfo.setAvatarLink(data);
    loadingAvatar();
    cardRedactAvatar.toggleButtonState();
}
//initial new card
function submitAddCardForm(evt) {
    evt.preventDefault();
    renderLoading(true, popupAddNewCard);
    loadingNewCard();
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
}

openEditProfilePopupBtn.addEventListener('click', function() {
    const data = userInfo.getUserInfo();
    const nameInput = document.querySelector('.form__input_type_name');
    const jobInput = document.querySelector('.form__input_type_job');

    nameInput.value = data.name;
    jobInput.value = data.about;
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

//API
function renderError(err) {
    result.textContent = '';
    error.textContent = err;
}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
        'Content-Type': 'application/json'
    }
});
initialAll();
//initial users and initial card from server 
function initialAll() {
    Promise.all([api.initialUsers(), api.initCardsFromServer()])
        .then((result) => {
            userInfo.setUserInfo(result[0]);
            userInfo.setAvatarLink(result[0]);
            addSection.renderItems(result[1].reverse());
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
}
//delete cards from server
function deleteServerCard(cardId) {
    api.deleteCardFromServer(cardId)
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        }).then(() => popupDeletion.closePopup());
}
//like cards
function likeCard(likeId) {
    api.likeCards(likeId).catch((err) => {
        renderError(`Ошибка: ${err}`);
    });
}

//dislike cards
function dislikeCard(likeId) {
    api.dislikeCards(likeId).catch((err) => {
        renderError(`Ошибка: ${err}`);
    });
}
//loading new avatar on server
function loadingAvatar() {
    api.loadingNewAvatarOnServer(selectorsAll.infoAvatar)
        .then(() => popupRedactAvatar.closePopup())
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupAvatarRedact);
        });
}
//loading new cards on server 
function loadingNewCard() {
    api.loadingNewCardOnServer(selectorsAll.infoTitle, selectorsAll.infoLink)
        .then(result => {
            addSection.addItem(renderCard(result));
            popupAddCard.closePopup();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupAddNewCard);
        });
}
//loading info about user on server
function loadingUserInfo() {
    api.loadingUserInfoOnServer(selectorsAll.infoName, selectorsAll.infoJob)
        .then(() => popupEditProfile.closePopup())
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupProfileRedact);
        });
}
//good UX
function renderLoading(isLoading, popup) {
    if (isLoading) {
        popup.querySelector(selectorsAll.formloading).classList.add('form__loading_visible');
        popup.querySelector(selectorsAll.submitButtonSelector).classList.add('form__save-button_hidden');
    } else {
        popup.querySelector(selectorsAll.formloading).classList.remove('form__loading_visible');
        popup.querySelector(selectorsAll.submitButtonSelector).classList.remove('form__save-button_hidden');
    }
}