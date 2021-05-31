export class FormValidator {
    constructor(selectors, elements) {
        this._selectors = selectors;
        this._elements = elements;
    }
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._elements.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._elements.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        const inputList = Array.from(this._elements.querySelectorAll(this._selectors.inputSelector));
        const buttonElement = this._elements.querySelector(this._selectors.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {

            inputElement.addEventListener('input', () => {

                this._checkInputValidity(inputElement);

                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    _hasInvalidInput = (inputList) => {

        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState = (inputList, buttonElement) => {

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._selectors.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._selectors.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    enableValidation() {
        const classesList = this._selectors;
        const formElement = this._elements;
        const formList = Array.from(document.querySelectorAll(this._selectors.formSelector));
        formList.forEach(() => {
            this._elements.addEventListener('submit', function(evt) {
                evt.preventDefault();
            });
            this._setEventListeners();
        });
    }
}