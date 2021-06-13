import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._submitForm = submitForm;
    }
    _getInputValues() {
        let inputElements = this._popup.querySelectorAll('.form__input');
        let inputElement = {};
        for (let i = 0; i < inputElements.length; i++) {
            const item = inputElements.item(i);
            inputElement[item.name] = item.value;
        }
        return inputElement
    }
    setEventListeners() {
        super.setEventListeners();
    }
    openPopup() {
        super.openPopup();
    }
}