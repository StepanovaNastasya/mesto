import {validationConfig} from './constants.js';

function showError(input, spanError, inputErrorClass, spanErrorClass, errorMessage) {
  input.classList.add(inputErrorClass);
  spanError.textContent = errorMessage;
  spanError.classList.add(spanErrorClass); 
};

function hideError(input, spanError, inputErrorClass, spanErrorClass) {
  input.classList.remove(inputErrorClass);
  spanError.classList.remove(spanErrorClass); 
  spanError.textContent = ''; 
};

function disableButton(button, buttonErrorClass) {
  button.classList.add(buttonErrorClass);
  button.disabled = true;
}

function enableButton(button, buttonErrorClass) {
  button.classList.remove(buttonErrorClass);
  button.disabled = false;
}

function checkButton(inputs, button, buttonErrorClass) {
  const formHasAnyInvalidInput = Array.from(inputs).some(function(input) {
    return !input.validity.valid;
  });

  if (formHasAnyInvalidInput) {
    disableButton(button, buttonErrorClass);
  }
  else {
    enableButton(button, buttonErrorClass);
  }
}

function checkInputValidity(inputs, button, input, spanError, inputErrorClass, spanErrorClass, buttonErrorClass)  {
  if (!input.validity.valid) {
    showError(input, spanError, inputErrorClass, spanErrorClass, input.validationMessage);
  } 
  else {
    hideError(input, spanError, inputErrorClass, spanErrorClass);
  }
  checkButton(inputs, button, buttonErrorClass);
};

function enableValidation(config){
  document.querySelectorAll(config.formSelector).forEach(function(form) {
    const inputs = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector);

    inputs.forEach(function(input) {
      const spanError = document.querySelector(`#${input.id}-error`);
      input.addEventListener('input', function () {
        checkInputValidity(inputs, button, input, spanError, config.inputErrorClass, config.errorClass, config.inactiveButtonClass);
      });
    });
  });
}

enableValidation(validationConfig);