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

let page = document.querySelector('.page');
let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let cardElements = main.querySelector('.elements');
let profileInfo = profile.querySelector('.profile-info');
let popupEditProfile = page.querySelector('.popup_type_redact');
let popupAddCard = page.querySelector('.popup_type_add-card');
let popupImage = page.querySelector('.popup_type_image');
let redactContainer = popupEditProfile.querySelector('.popup__container');
let editContainer = popupAddCard.querySelector('.popup__container');
let imageContainer = popupImage.querySelector('.popup__container');
let formEditProfile = redactContainer.querySelector('.form');
let formImage = imageContainer.querySelector('.form');
let formAddCard = editContainer.querySelector('.form');

let openEditProfilePopupBtn = profileInfo.querySelector('.profile-info__edit-button');
let openAddCardPopupBtn = profile.querySelector('.profile__add-button');
let closeEditProfilePopupBtn = redactContainer.querySelector('.popup__close-button');
let closeAddCardPopupBtn = editContainer.querySelector('.popup__close-button');
let closeImage = imageContainer.querySelector('.popup__close-button');

let jobOutput = profileInfo.querySelector('.profile-info__job');
let nameOutput = profileInfo.querySelector('.profile-info__name');

//content Redact
let nameInput = formEditProfile.querySelector('.form__input_type_name');
let jobInput = formEditProfile.querySelector('.form__input_type_job');

//content Edit for new Card
let titleEdit = formAddCard.querySelector('.form__input_type_title');
let linkEdit = formAddCard.querySelector('.form__input_type_link');

//Cards-content
let imagePopupCard = formImage.querySelector('.form__image');
let titlePopupCard = formImage.querySelector('.form__text');

//let imageCard = cardElement.querySelector('.element__image');
//let titleCard = cardElement.querySelector('.element__text');

//loading "saved" cards from "server"
initialCards.forEach(function(element) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__image').alt = element.name;
    cardElement.querySelector('.element__text').textContent = element.name;

    setOpenImageListener(cardElement);
    setDeleteCardListener(cardElement);
    setLikeCardListener(cardElement);

    cardElements.append(cardElement);
})

function openPopup(popup) {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
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

//create nev Card and insert in DOM
function submitAddCardForm(evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    setOpenImageListener(cardElement);
    setDeleteCardListener(cardElement);
    setLikeCardListener(cardElement);

    cardElement.querySelector('.element__image').src = linkEdit.value;
    cardElement.querySelector('.element__image').alt = titleEdit.value;
    cardElement.querySelector('.element__text').textContent = titleEdit.value;

    cardElements.prepend(cardElement);
    evt.target.reset();
    closePopup(popupAddCard);
}

openEditProfilePopupBtn.addEventListener('click', function() { openPopup(popupEditProfile) });
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