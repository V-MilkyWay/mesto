let page = document.querySelector('.page');
let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let formElement = page.querySelector('.popup');

let editButton = profileInfo.querySelector('.profile-info__edit-button');
let closeButton = formElement.querySelector('.popup__close-icon');
let saveButton = formElement.querySelector('.popup__button');

let jobOutput = profileInfo.querySelector('.profile-info__job');
let nameOutput = profileInfo.querySelector('.profile-info__name');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

function openPopup() {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
    formElement.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    formElement.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function savePopup() {
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    formElement.classList.remove('popup_opened');
}

saveButton.addEventListener('click', savePopup);