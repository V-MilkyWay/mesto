let page = document.querySelector('.page');
let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let popup = page.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let formElement = popupContainer.querySelector('.form');

let editButton = profileInfo.querySelector('.profile-info__edit-button');
let closeButton = popupContainer.querySelector('.popup__close-button');
let saveButton = formElement.querySelector('.form__save-button');

let jobOutput = profileInfo.querySelector('.profile-info__job');
let nameOutput = profileInfo.querySelector('.profile-info__name');

let nameInput = formElement.querySelector('.form__input_name');
let jobInput = formElement.querySelector('.form__input_job');

function openPopup() {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
    console.log('ddd')
    popup.classList.add('popup_opened');
};

function closePopup() {
    console.log('ddd')
    popup.classList.remove('popup_opened');
};

function formSubmitHandler(e) {
    e.preventDefault();
    console.log('sss');
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    popup.classList.add('popup_opened');
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('submit', formSubmitHandler);