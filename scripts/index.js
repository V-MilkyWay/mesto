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

const namesCards = initialCards.map(function(element) {
    return element.name;
});
const linksCards = initialCards.map(function(element) {
    return element.link;
});

console.log(namesCards)

let page = document.querySelector('.page');
let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let cardElements = main.querySelector('.elements');
let profileInfo = profile.querySelector('.profile-info');
let popupRedact = page.querySelector('.popup_type_redact');
let popupContainer = popupRedact.querySelector('.popup__container');
let formElement = popupContainer.querySelector('.form');

let editButton = profileInfo.querySelector('.profile-info__edit-button');
let closeButton = popupContainer.querySelector('.popup__close-button');

let jobOutput = profileInfo.querySelector('.profile-info__job');
let nameOutput = profileInfo.querySelector('.profile-info__name');

let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');


initialCards.forEach(function(element) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__image').alt = element.name;
    cardElement.querySelector('.element__text').textContent = element.name;

    cardElements.append(cardElement);
})

///////////////////////////////
function openPopup() {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
    popupRedact.classList.add('popup_opened');
};

function closePopup() {
    popupRedact.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    popupRedact.classList.remove('popup_opened');
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);