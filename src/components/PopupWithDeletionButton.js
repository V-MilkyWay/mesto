import { Popup } from './Popup.js';

export class PopupWithDeletionButton extends Popup {
    constructor(popupSelector, deleteCardFromServer) {
        super(popupSelector);
        this._deleteCardFromServer = deleteCardFromServer;
    }
    openPopup(card, cardId) {
        super.openPopup();
        this._card = card
        this._cardId = cardId
    }
    deleteEventListener() {
        this._popup.querySelector('.form').addEventListener('submit', (evt) => {
            this._deleteCardFromServer(evt, this._card, this._cardId);
        });
    }

    closePopup() {
        this._popup.querySelector('.form').reset();
        super.closePopup();
    }
}