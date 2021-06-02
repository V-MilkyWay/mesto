const page = document.querySelector('.page');
const popupImage = page.querySelector('.popup_type_image');
const imageContainer = popupImage.querySelector('.popup__container');
const formImage = imageContainer.querySelector('.form-image');
const imagePopupCard = formImage.querySelector('.form-image__image');
const titlePopupCard = formImage.querySelector('.form-image__text');

export class Card {
    constructor({ name, link }, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }


    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _handleOpenPopup() {
        imagePopupCard.src = this._link;
        imagePopupCard.alt = this._name;
        titlePopupCard.textContent = this._name;
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

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;

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