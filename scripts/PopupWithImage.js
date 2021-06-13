import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    openPopup(cardElement) {
        const imagePopupCard = this._popup.querySelector('.form-image__image');
        const titlePopupCard = this._popup.querySelector('.form-image__text');
        const cardImage = cardElement.querySelector('.element__image');
        const cardTitle = cardElement.querySelector('.element__text');

        imagePopupCard.src = cardImage.src;
        imagePopupCard.textContent = cardTitle.alt;
        titlePopupCard.textContent = cardTitle.textContent;
        super.openPopup();
    };
}