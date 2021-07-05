import { Popup } from './Popup.js';

export class PopupWithDeletionButton extends Popup {
    constructor(popupSelector, deleteCardFromServer) {
        super(popupSelector);
        this._deleteCardFromServer = deleteCardFromServer;
    }

    deleteEventListener(element, id) {
        this._popup.querySelector('.form__save-button').addEventListener('click', () => {
            this._deleteCardFromServer(id);
            element.remove();
            this.closePopup();
        });
    }
}