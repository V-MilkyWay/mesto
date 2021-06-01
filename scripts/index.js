import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-сards.js';

const selectorsAll = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_type_active'
};

const page = document.querySelector('.page');
const main = document.querySelector('.main');
const profile = main.querySelector('.profile');
const cardElements = main.querySelector('.elements');
const profileInfo = profile.querySelector('.profile-info');
const popups = page.querySelectorAll('.popup');
const popupEditProfile = page.querySelector('.popup_type_redact');
const popupAddCard = page.querySelector('.popup_type_add-card');
const redactContainer = popupEditProfile.querySelector('.popup__container');
const editContainer = popupAddCard.querySelector('.popup__container');
const formEditProfile = redactContainer.querySelector('.form');
const formAddCard = editContainer.querySelector('.form');

const popupImage = page.querySelector('.popup_type_image');
const imageContainer = popupImage.querySelector('.popup__container');
const closeImageBtn = imageContainer.querySelector('.popup__close-button');


const openEditProfilePopupBtn = profileInfo.querySelector('.profile-info__edit-button');
const openAddCardPopupBtn = profile.querySelector('.profile__add-button');
const closeEditProfilePopupBtn = redactContainer.querySelector('.popup__close-button');
const closeAddCardPopupBtn = editContainer.querySelector('.popup__close-button');

const jobOutput = profileInfo.querySelector('.profile-info__job');
const nameOutput = profileInfo.querySelector('.profile-info__name');

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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc(popup));
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc(popup));
};

function formEditProfileSubmitHandler(evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    closePopup(popupEditProfile);
};

//initial card from "server"
initialCards.forEach((initialCards) => {
    const card = new Card(initialCards.name, initialCards.link);
    const cardElement = card.generateCard();
    setOpenImageListener(cardElement)
    addCard(cardElement);
});

//add Card
function addCard(card) {
    cardElements.prepend(card);
};

function submitAddCardForm(evt) {
    evt.preventDefault();
    const newCard = new Card(titleEdit.value, linkEdit.value);
    const cardElement = newCard.generateCard();
    addCard(cardElement);
    resetForm(formAddCard);
    closePopup(popupAddCard);
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
}

function resetForm(nameForm) {
    nameForm.reset();
}

openEditProfilePopupBtn.addEventListener('click', function() {
    openPopup(popupEditProfile);
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
});

closeEditProfilePopupBtn.addEventListener('click', function() { closePopup(popupEditProfile) });
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

openAddCardPopupBtn.addEventListener('click', function() {
    openPopup(popupAddCard);
    resetForm(formAddCard);
});

closeAddCardPopupBtn.addEventListener('click', function() {
    closePopup(popupAddCard);
    resetForm(formAddCard);
});

formAddCard.addEventListener('submit', submitAddCardForm);

//open Images
function setOpenImageListener(cardElement) {
    const cardImage = cardElement.querySelector('.element__image');
    cardImage.addEventListener('click', function() {
        openPopup(popupImage);
    });
}

// close all popups - overlay
popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        if (evt.target === popup) {
            closePopup(popup);
        };
    });
});

const closeByEsc = (popup) => (evt) => {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

closeImageBtn.addEventListener('click', function() { closePopup(popupImage) });