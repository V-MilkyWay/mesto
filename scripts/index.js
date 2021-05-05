const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const page = document.querySelector('.page');
const main = document.querySelector('.main');
const profile = main.querySelector('.profile');
const cardElements = main.querySelector('.elements');
const profileInfo = profile.querySelector('.profile-info');
const popupEditProfile = page.querySelector('.popup_type_redact');
const popupAddCard = page.querySelector('.popup_type_add-card');
const popupImage = page.querySelector('.popup_type_image');
const redactContainer = popupEditProfile.querySelector('.popup__container');
const editContainer = popupAddCard.querySelector('.popup__container');
const imageContainer = popupImage.querySelector('.popup__container');
const formEditProfile = redactContainer.querySelector('.form');
const formImage = imageContainer.querySelector('.form');
const formAddCard = editContainer.querySelector('.form');

const openEditProfilePopupBtn = profileInfo.querySelector('.profile-info__edit-button');
const openAddCardPopupBtn = profile.querySelector('.profile__add-button');
const closeEditProfilePopupBtn = redactContainer.querySelector('.popup__close-button');
const closeAddCardPopupBtn = editContainer.querySelector('.popup__close-button');
const closeImage = imageContainer.querySelector('.popup__close-button');

const jobOutput = profileInfo.querySelector('.profile-info__job');
const nameOutput = profileInfo.querySelector('.profile-info__name');

//content Redact
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');

//content Edit for new Card
const titleEdit = formAddCard.querySelector('.form__input_type_title');
const linkEdit = formAddCard.querySelector('.form__input_type_link');

//Cards-content
const imagePopupCard = formImage.querySelector('.form__image');
const titlePopupCard = formImage.querySelector('.form__text');

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function formEditProfileSubmitHandler(evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    closePopup(popupEditProfile);
};

//create Card
function createCard(imageCard, textCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const elementText = cardElement.querySelector('.element__text');
    elementImage.src = imageCard;
    elementImage.alt = textCard;
    elementText.textContent = textCard;
    setOpenImageListener(cardElement);
    setDeleteCardListener(cardElement);
    setLikeCardListener(cardElement);
    cardElements.prepend(cardElement);
};

//loading "saved" cards from "server"

initialCards.forEach(function(element) {
    createCard(element.link, element.name)
})

//create new Card 
function submitAddCardForm(evt) {
    evt.preventDefault();
    createCard(linkEdit.value, titleEdit.value);
    evt.target.reset();
    closePopup(popupAddCard);
}

openEditProfilePopupBtn.addEventListener('click', function() {
    openPopup(popupEditProfile);
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
});

closeEditProfilePopupBtn.addEventListener('click', function() { closePopup(popupEditProfile) });
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

openAddCardPopupBtn.addEventListener('click', function() { openPopup(popupAddCard) });
closeAddCardPopupBtn.addEventListener('click', function() { closePopup(popupAddCard) });
formAddCard.addEventListener('submit', submitAddCardForm);

closeImage.addEventListener('click', function() { closePopup(popupImage) });

//open Images
function setOpenImageListener(cardElement) {

    const cardImage = cardElement.querySelector('.element__image');
    cardImage.addEventListener('click', function() {

        openPopup(popupImage);

        imagePopupCard.src = cardElement.querySelector('.element__image').src;
        imagePopupCard.textContent = cardElement.querySelector('.element__text').alt;
        titlePopupCard.textContent = cardElement.querySelector('.element__text').textContent;
    });
}

//delite Card
function setDeleteCardListener(cardElement) {

    const resetButton = cardElement.querySelector('.element__button-trash')

    resetButton.addEventListener('click', function() {

        cardElement.remove();
    });
};

//like Card
function setLikeCardListener(cardElement) {

    cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });

}