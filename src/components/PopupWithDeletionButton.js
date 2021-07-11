import { Popup } from './Popup.js';

export class PopupWithDeletionButton extends Popup {
    constructor(popupSelector, deleteCardFromServer) {
        super(popupSelector);
        this._deleteCardFromServer = deleteCardFromServer;
    }

    deleteEventListener(card, cardId) {
        this._popup.querySelector('.form').addEventListener('submit', (evt) => {
            this._deleteCardFromServer(evt, card, cardId);
        });
    }

    closePopup() {
        this._popup.querySelector('.form').reset();
        super.closePopup();
    }
}