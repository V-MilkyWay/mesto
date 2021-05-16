const showInputError = (classesList, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(classesList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classesList.errorClass);
};

const hideInputError = (classesList, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(classesList.inputErrorClass);
    errorElement.classList.remove(classesList.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (classesList, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(classesList, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(classesList, formElement, inputElement);
    }
};

const setEventListeners = (classesList, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(classesList.inputSelector));
    const buttonElement = formElement.querySelector(classesList.submitButtonSelector);

    toggleButtonState(classesList, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(classesList, formElement, inputElement);

            toggleButtonState(classesList, inputList, buttonElement);
        });
    });
};

const enableValidation = (classesList) => {
    const formList = Array.from(document.querySelectorAll(classesList.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(classesList, formElement);
    });
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (classesList, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(classesList.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(classesList.inactiveButtonClass);
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