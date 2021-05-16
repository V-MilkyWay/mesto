const showInputError = (classes, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classes.errorClass);
};

const hideInputError = (classes, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(classes.inputErrorClass);
    errorElement.classList.remove(classes.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (classes, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(classes, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(classes, formElement, inputElement);
    }
};

const setEventListeners = (classes, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
    const buttonElement = formElement.querySelector(classes.submitButtonSelector);

    toggleButtonState(classes, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(classes, formElement, inputElement);

            toggleButtonState(classes, inputList, buttonElement);
        });
    });
};

const enableValidation = (classes) => {
    const formList = Array.from(document.querySelectorAll(classes.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(classes, formElement);
    });
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (classes, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(classes.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(classes.inactiveButtonClass);
    }
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error_active'
});