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
let popupRedact = page.querySelector('.popup_type_redact');
let popupEdit = page.querySelector('.popup_type_edit');
let popupImage = page.querySelector('.popup_type_image');
let redactContainer = popupRedact.querySelector('.popup__container');
let editContainer = popupEdit.querySelector('.popup__container');
let imageContainer = popupImage.querySelector('.popup__container');
let formRedact = redactContainer.querySelector('.form');
let formImage = imageContainer.querySelector('.form');
let formEdit = editContainer.querySelector('.form');

let redactButton = profileInfo.querySelector('.profile-info__edit-button');
let editButton = profile.querySelector('.profile__add-button');
let closeRedact = redactContainer.querySelector('.popup__close-button');
let closeEdit = editContainer.querySelector('.popup__close-button');
let closeImage = imageContainer.querySelector('.popup__close-button');



let jobOutput = profileInfo.querySelector('.profile-info__job');
let nameOutput = profileInfo.querySelector('.profile-info__name');


//content Redact
let nameInput = formRedact.querySelector('.form__input_type_name');
let jobInput = formRedact.querySelector('.form__input_type_job');

//content Edit for new Card
let titleEdit = formEdit.querySelector('.form__input_type_title');
let linkEdit = formEdit.querySelector('.form__input_type_link');


//loading "saved" cards from "server"
initialCards.forEach(function(element) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);



    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__image').alt = element.name;
    cardElement.querySelector('.element__text').textContent = element.name;

    openImages(cardElement);
    deliteCard(cardElement);


    cardElements.append(cardElement);
})


function openPopup(namePopup) {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
    namePopup.classList.add('popup_opened');
};

function closePopup(namePopup) {
    namePopup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;

    popupRedact.classList.remove('popup_opened');
};

//create nev Card and insert in DOM
function saveEdit(evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    openImages(cardElement);
    deliteCard(cardElement);

    cardElement.querySelector('.element__image').src = linkEdit.value;
    cardElement.querySelector('.element__image').alt = titleEdit.value;
    cardElement.querySelector('.element__text').textContent = titleEdit.value;

    cardElements.prepend(cardElement);
    popupEdit.classList.remove('popup_opened');
    evt.target.reset();
}

redactButton.addEventListener('click', function() { openPopup(popupRedact) });
closeRedact.addEventListener('click', function() { closePopup(popupRedact) });
formRedact.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', function() { openPopup(popupEdit) });
closeEdit.addEventListener('click', function() { closePopup(popupEdit) });
formEdit.addEventListener('submit', saveEdit);

closeImage.addEventListener('click', function() { closePopup(popupImage) });

//open Images
function openImages(cardElement) {
    let openImage = cardElement.querySelector('.element__image');
    openImage.addEventListener('click', function() {
        openPopup(popupImage);
        formImage.querySelector('.form__image').src = cardElement.querySelector('.element__image').src;
        formImage.querySelector('.form__image').textContent = cardElement.querySelector('.element__text').alt;
        formImage.querySelector('.form__text').textContent = cardElement.querySelector('.element__text').textContent;
    });
}
//delite Card
function deliteCard(cardElement) {
    let resetButton = cardElement.querySelector('.element__button-trash')

    resetButton.addEventListener('click', function() {

        cardElement.remove();
    });
};