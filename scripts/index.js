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
const popups = page.querySelectorAll('.popup');
const popupEditProfile = page.querySelector('.popup_type_redact');
const popupAddCard = page.querySelector('.popup_type_add-card');
const popupImage = page.querySelector('.popup_type_image');
const redactContainer = popupEditProfile.querySelector('.popup__container');
const editContainer = popupAddCard.querySelector('.popup__container');
const imageContainer = popupImage.querySelector('.popup__container');
const formEditProfile = redactContainer.querySelector('.form');
const formImage = imageContainer.querySelector('.form_type_image');
const formAddCard = editContainer.querySelector('.form');

const openEditProfilePopupBtn = profileInfo.querySelector('.profile-info__edit-button');
const openAddCardPopupBtn = profile.querySelector('.profile__add-button');
const closeEditProfilePopupBtn = redactContainer.querySelector('.popup__close-button');
const closeAddCardPopupBtn = editContainer.querySelector('.popup__close-button');
const closeImage = imageContainer.querySelector('.popup__close-button');

const jobOutput = profileInfo.querySelector('.profile-info__job');
const nameOutput = profileInfo.querySelector('.profile-info__name');

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.element');

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
    const newCardElement = cardElement.cloneNode(true);
    const cardImage = newCardElement.querySelector('.element__image');
    const elementText = newCardElement.querySelector('.element__text');

    cardImage.src = imageCard;
    cardImage.alt = textCard;
    elementText.textContent = textCard;

    setOpenImageListener(newCardElement);
    setDeleteCardListener(newCardElement);
    setLikeCardListener(newCardElement);

    return newCardElement;
};

//add Card
function addCard(card) {
    cardElements.prepend(card);
};

//loading "saved" cards from "server"

initialCards.forEach(function(element) {
    const newCard = createCard(element.link, element.name);
    addCard(newCard);
})

//create new Card 
function submitAddCardForm(evt) {
    evt.preventDefault();
    const newCard = createCard(linkEdit.value, titleEdit.value);
    addCard(newCard);
    resetForm(formAddCard);
    closePopup(popupAddCard);
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

openAddCardPopupBtn.addEventListener('click', function() { openPopup(popupAddCard) });
closeAddCardPopupBtn.addEventListener('click', function() {
    closePopup(popupAddCard);
    resetForm(formAddCard);
});
formAddCard.addEventListener('submit', submitAddCardForm);

closeImage.addEventListener('click', function() { closePopup(popupImage) });

//open Images
function setOpenImageListener(cardElement) {

    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__text');

    cardImage.addEventListener('click', function() {
        openPopup(popupImage);

        imagePopupCard.src = cardImage.src;
        imagePopupCard.textContent = cardTitle.alt;
        titlePopupCard.textContent = cardTitle.textContent;
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

// close all popups - Esc
popups.forEach((popup) => {
    document.addEventListener('keydown', function(evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
            resetForm(formAddCard);
        }
    });
});

// close all popups - overlay
popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        console.log(evt.target)
        if (evt.target === popup) {
            closePopup(popup);
            resetForm(formAddCard);
        };
    });
});