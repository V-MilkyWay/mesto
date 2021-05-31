const page = document.querySelector('.page');
const popupImage = page.querySelector('.popup_type_image');
const imageContainer = popupImage.querySelector('.popup__container');
const formImage = imageContainer.querySelector('.form-image');
const imagePopupCard = formImage.querySelector('.form-image__image');
const titlePopupCard = formImage.querySelector('.form-image__text');
const closeImageBtn = imageContainer.querySelector('.popup__close-button');

export class Card {
    constructor(title, description, image) {
        this._title = title;
        this._description = description;
        this._image = image;
    }


    _getTemplate() {
        const cardElement = document
            .querySelector('#card-template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _handleOpenPopup() {
        imagePopupCard.src = this._image;
        imagePopupCard.textContent = this._description;
        titlePopupCard.textContent = this._title;
        popupImage.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                popupImage.classList.remove('popup_opened');
            }
        });

    }
    _handleClosePopup() {
        popupImage.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                popupImage.classList.remove('popup_opened');
            }
        });
    }

    _setLikeCardListener(evt) {

        evt.target.classList.toggle('element__like_active');
    }

    _setDeleteCardListener() {

        this._element.remove();

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__text').textContent = this._title;
        this._element.querySelector('.element__image').alt = this._description;

        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        closeImageBtn.addEventListener('click', () => {
            this._handleClosePopup();
        });

        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._setLikeCardListener(evt);
        });

        this._element.querySelector('.element__button-trash').addEventListener('click', () => {

            this._setDeleteCardListener();
        });

    }
}