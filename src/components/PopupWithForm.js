import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._submitForm = submitForm;
    }
    _getInputValues() {
        const inputElements = this._popup.querySelectorAll('.form__input');
        const inputElement = {};
        for (let i = 0; i < inputElements.length; i++) {
            const item = inputElements.item(i);
            inputElement[item.name] = item.value;
        }
        return inputElement
    }
    setEventListeners() {
        this._data = this._getInputValues;
        this._popup.querySelector('.form').addEventListener('submit', (evt) => {
            this._submitForm(evt, this._data())
        });

        super.setEventListeners();
    }
    closePopup() {
        this._popup.querySelector('.form').reset();
        super.closePopup();
    }
}