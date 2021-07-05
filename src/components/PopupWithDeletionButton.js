import { Popup } from './Popup.js';

export class PopupWithDeletionButton extends Popup {
    constructor(popupSelector, deleteCardFromServer) {
        super(popupSelector);
        this._deleteCardFromServer = deleteCardFromServer;
    }

    deleteEventListener(element, cardId) {
        this._popup.querySelector('.form__save-button').addEventListener('click', () => {
            this._deleteCardFromServer(cardId);
            element.remove();
            this.closePopup();
        });
    }
}