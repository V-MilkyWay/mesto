const page = document.querySelector('.page');
const popupImage = page.querySelector('.popup_type_image');
const imageContainer = popupImage.querySelector('.popup__container');
const formImage = imageContainer.querySelector('.form-image');
const imagePopupCard = formImage.querySelector('.form-image__image');
const titlePopupCard = formImage.querySelector('.form-image__text');

export class Card {
    constructor(title, image) {
        this._title = title;
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
        imagePopupCard.alt = this._title;
        titlePopupCard.textContent = this._title;
    }

    _setLikeCardListener(evt) {

        evt.target.classList.toggle('element__like_active');
    }

    _setDeleteCardListener() {

        this._element.remove();
        this._element = null;

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__text').textContent = this._title;
        this._element.querySelector('.element__image').alt = this._title;

        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._setLikeCardListener(evt);
        });

        this._element.querySelector('.element__button-trash').addEventListener('click', () => {

            this._setDeleteCardListener();
        });

    }
}