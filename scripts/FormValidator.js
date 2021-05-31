export class FormValidator {
    constructor(selectors, elements) {
        this._selectors = selectors;
        this._elements = elements;
    }
    _showInputError = (classesList, formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(classesList.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(classesList.errorClass);
    };

    _hideInputError = (classesList, formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(classesList.inputErrorClass);
        errorElement.classList.remove(classesList.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (classesList, formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(classesList, formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(classesList, formElement, inputElement);
        }
    };

    _setEventListeners = (classesList, formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(classesList.inputSelector));
        const buttonElement = formElement.querySelector(classesList.submitButtonSelector);

        this._toggleButtonState(classesList, inputList, buttonElement);

        inputList.forEach((inputElement) => {

            inputElement.addEventListener('input', () => {

                this._checkInputValidity(classesList, formElement, inputElement);

                this._toggleButtonState(classesList, inputList, buttonElement);
            });
        });
    };

    _hasInvalidInput = (inputList) => {

        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState = (classesList, inputList, buttonElement) => {

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(classesList.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(classesList.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    enableValidation() {
        const classesList = this._selectors;
        const formElement = this._elements;
        const formList = Array.from(document.querySelectorAll(classesList.formSelector));
        formList.forEach(() => {
            formElement.addEventListener('submit', function(evt) {
                evt.preventDefault();
            });
            this._setEventListeners(classesList, formElement);
        });
    }
}