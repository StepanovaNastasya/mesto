export class FormValidator {
  constructor(config, form) {
    this._inputs = form.querySelectorAll(config.inputSelector);
    this._button = form.querySelector(config.submitButtonSelector);
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }
  
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _showError(input, spanError, errorMessage) {
    input.classList.add(this._inputErrorClass);
    spanError.textContent = errorMessage;
    spanError.classList.add(this._errorClass); 
  };
  
  _hideError(input, spanError) {
    input.classList.remove(this._inputErrorClass);
    spanError.classList.remove(this._errorClass); 
    spanError.textContent = ''; 
  };

  _checkButton() {
    const formHasAnyInvalidInput = Array.from(this._inputs).some(function(input) {
      return !input.validity.valid;
    });
  
    if (formHasAnyInvalidInput) {
      this._disableButton();
    }
    else {
      this._enableButton();
    }
  }

  _checkInputValidity(input, spanError)  {
    if (!input.validity.valid) {
      this._showError(input, spanError, input.validationMessage);
    } 
    else {
      this._hideError(input, spanError);
    }
    this._checkButton();
  };

  enableValidation(){
    this._inputs.forEach((input) => {
      const spanError = document.querySelector(`#${input.id}-error`);
      input.addEventListener('input', () => {
        this._checkInputValidity(input, spanError);
      });
    });
  }
}