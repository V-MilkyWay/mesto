import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-сards.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const selectorsUserInfo = {
    name: '.profile-info__name',
    job: '.profile-info__job'
};

const selectorsAll = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_type_active'
};

const popupEditProf = document.querySelector('.popup_type_redact');
const popupAddCards = document.querySelector('.popup_type_add-card');
const redactContainer = popupEditProf.querySelector('.popup__container');
const editContainer = popupAddCards.querySelector('.popup__container');
const formEditProfile = redactContainer.querySelector('.form');
const formAddCard = editContainer.querySelector('.form');

const openEditProfilePopupBtn = document.querySelector('.profile-info__edit-button');
const openAddCardPopupBtn = document.querySelector('.profile__add-button');

//content Redact
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');

//content Edit for new Card
const titleEdit = formAddCard.querySelector('.form__input_type_title');
const linkEdit = formAddCard.querySelector('.form__input_type_link');

//validations
const cardEditProfile = new FormValidator(selectorsAll, formEditProfile);
const cardAdd = new FormValidator(selectorsAll, formAddCard);

cardEditProfile.enableValidation();
cardAdd.enableValidation();
cardEditProfile.toggleButtonState();
cardAdd.toggleButtonState();

const popupEditProfile = new PopupWithForm('.popup_type_redact', formEditProfileSubmitHandler);
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(selectorsUserInfo);

//initial card from "server"
const addSection = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, '#card-template', handleCardClick);
            const cardElement = card.generateCard();
            addSection.addItem(cardElement);
        }
    },
    '.elements'
);
addSection.renderItems();

//initial new card
function submitAddCardForm(evt) {
    evt.preventDefault();
    const data = [{
        name: titleEdit.value,
        link: linkEdit.value
    }]
    const newSection = new Section({
            items: data,
            renderer: (item) => {
                const newCard = new Card(item, '#card-template', handleCardClick);
                const cardElement = newCard.generateCard();
                newSection.addItem(cardElement);
            }
        },
        '.elements'
    );
    newSection.renderItems();
    popupAddCard.closePopup();
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
}

function formEditProfileSubmitHandler(evt) {
    evt.preventDefault();
    userInfo.setUserInfo();
    popupEditProfile.closePopup();
};

openEditProfilePopupBtn.addEventListener('click', function() {
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    jobInput.value = data.job;
    cardEditProfile.toggleButtonState();
    popupEditProfile.openPopup();
});

openAddCardPopupBtn.addEventListener('click', function() {
    cardAdd.toggleButtonState();
    popupAddCard.openPopup();
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();

//open image
function handleCardClick(elementImage) {
    popupImage.openPopup(elementImage);
}