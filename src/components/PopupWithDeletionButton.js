import { Popup } from './Popup.js';

export class PopupWithDeletionButton extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    deleteEventListener(element) {
        this._popup.querySelector('.form__save-button').addEventListener('click', () => {
            element.remove();
            this.closePopup();
        });
    }
}