
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

function checkButton(inputs, button, buttonErrorClass) {
  const disableButton = Array.from(inputs).some(function(input) {
    if (!input.validity.valid) {
      return true;
    } 
    else {
      return false;
    }
  });

  if (disableButton) {
    button.classList.add(buttonErrorClass);
  }
  else {
    button.classList.remove(buttonErrorClass);
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

function enableValidation(description){
  document.querySelectorAll(description.formSelector).forEach(function(form) {
    const inputs = form.querySelectorAll(description.inputSelector);
    const button = form.querySelector(description.submitButtonSelector);

    inputs.forEach(function(input) {
      const spanError = document.getElementById(`${input.id}-error`);
      input.addEventListener('input', function () {
        checkInputValidity(inputs, button, input, spanError, description.inputErrorClass, description.errorClass, description.inactiveButtonClass);
      });
    });
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__savebutton',
  inactiveButtonClass: 'form__savebutton_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
});