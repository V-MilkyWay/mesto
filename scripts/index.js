import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-сards.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';

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
const profileInfo = profile.querySelector('.profile-info');
const popups = page.querySelectorAll('.popup');
const popupEditProf = page.querySelector('.popup_type_redact');
const popupAddCards = page.querySelector('.popup_type_add-card');
const redactContainer = popupEditProf.querySelector('.popup__container');
const editContainer = popupAddCards.querySelector('.popup__container');
const formEditProfile = redactContainer.querySelector('.form');
const formAddCard = editContainer.querySelector('.form');

const popupImage = page.querySelector('.popup_type_image');
const imageContainer = popupImage.querySelector('.popup__container');
const closeImageBtn = imageContainer.querySelector('.popup__close-button');


const openEditProfilePopupBtn = profileInfo.querySelector('.profile-info__edit-button');
const openAddCardPopupBtn = profile.querySelector('.profile__add-button');

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

const popupEditProfile = new Popup('.popup_type_redact');
const popupAddCard = new Popup('.popup_type_add-card');

function formEditProfileSubmitHandler(evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    popupEditProfile.closePopup();
};
//initial card from "server"
const addSection = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, '#card-template');
            const cardElement = card.generateCard();
            setOpenImageListener(cardElement);
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
                const newCard = new Card(item, '#card-template');
                const cardElement = newCard.generateCard();
                newSection.addItem(cardElement);
            }
        },
        '.elements'
    );
    newSection.renderItems();
    resetForm(formAddCard);
    popupAddCard.closePopup();
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
}

function resetForm(nameForm) {
    nameForm.reset();
}

openEditProfilePopupBtn.addEventListener('click', function() {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
    cardEditProfile.toggleButtonState();
    popupEditProfile.openPopup();
});
popupEditProfile.setEventListeners();
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

openAddCardPopupBtn.addEventListener('click', function() {
    cardAdd.toggleButtonState();
    popupAddCard.openPopup();
    resetForm(formAddCard);
});

popupAddCard.setEventListeners();

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
            popup.classList.remove('popup_opened');
        };
    });
});


closeImageBtn.addEventListener('click', function() { closePopup(popupImage) });