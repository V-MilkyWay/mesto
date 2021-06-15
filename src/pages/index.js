import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initial-сards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
    formEditProfile,
    formAddCard,
    openEditProfilePopupBtn,
    openAddCardPopupBtn,
    selectorsAll
} from '../utils/constants.js';

//validations
const cardEditProfile = new FormValidator(selectorsAll, formEditProfile);
const cardAdd = new FormValidator(selectorsAll, formAddCard);

cardEditProfile.enableValidation();
cardAdd.enableValidation();
cardAdd.toggleButtonState();

const popupEditProfile = new PopupWithForm('.popup_type_redact', formEditProfileSubmitHandler);
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(selectorsAll);

function renderCard(item) {
    const card = new Card(item, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}
//initial card from "server"
const addSection = new Section({
        items: initialCards,
        renderer: (item) => {
            addSection.addItem(renderCard(item));
        }
    },
    selectorsAll.elements
);
addSection.renderItems();

//initial new card
function submitAddCardForm(evt, data) {
    evt.preventDefault();
    addSection.addItem(renderCard(data));
    popupAddCard.closePopup();
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
}

function formEditProfileSubmitHandler(evt, data) {
    evt.preventDefault();
    userInfo.setUserInfo(data);
    popupEditProfile.closePopup();
};

openEditProfilePopupBtn.addEventListener('click', function() {
    const data = userInfo.getUserInfo();
    //content Redact
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

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();

//open image
function handleCardClick(elementImage) {
    popupImage.openPopup(elementImage);
}