export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };
    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }
    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.closePopup();
        });
    }
}