const formProfile = document.forms['form-profile'];
const formMesto = document.forms['form-mesto'];
const formMestoInputs = formMesto.querySelectorAll('.form__input');
const formProfileInputs = formProfile.querySelectorAll('.form__input');


const inputFormProfileName = formProfile.querySelector('.form__input_value_name');
const inputFormProfileProfession = formProfile.querySelector('.form__input_value_profession');
const submitFormProfileButton = formProfile.querySelector('.form__savebutton');

const inputFormMestoName = formMesto.querySelector('.form__input_value_image-name');
const inputFormMestoLink = formMesto.querySelector('.form__input_value_link');
const submitFormMestoButton = formMesto.querySelector('.form__savebutton');

const inputFormProfileNameError = document.getElementById('form-name-input-error');
const inputFormProfileProfessionError = document.getElementById('form-profession-input-error');
const inputFormMestoNameError = document.getElementById('form-name-image-error');
const inputFormMestoLinkError = document.getElementById('form-mesto-link-error');


function showError(input, spanError, errorMessage) {
  input.classList.add('form__input_type_error');
  spanError.textContent = errorMessage;
  spanError.classList.add('form__input-error_visible'); 
};

function hideError(input, spanError) {
  input.classList.remove('form__input_type_error');
  spanError.classList.remove('form__input-error_visible'); 
  spanError.textContent = ''; 
};

function checkInputValidityProfile(input, spanError)  {
  if (!input.validity.valid) {
    showError(input, spanError, input.validationMessage);
  } 
  else {
    hideError(input, spanError);
  }
  checkbuttonProfile();
};

function checkbuttonProfile() {
   if ((!inputFormProfileName.validity.valid) || (!inputFormProfileProfession.validity.valid)) {
    submitFormProfileButton.classList.add('form__savebutton_inactive');
   }
   else {
  submitFormProfileButton.classList.remove('form__savebutton_inactive');
}
}

///////////////////////


function checkInputValidityMesto (input, spanError)  {
  if (!input.validity.valid) {
    showError(input, spanError, input.validationMessage);
  } 
  else {
    hideError(input, spanError);
  }
  checkbuttonMesto();
};


function checkbuttonMesto() {
  if ((!inputFormMestoLink.validity.valid) || (!inputFormMestoName.validity.valid)) {
    submitFormMestoButton.classList.add('form__savebutton_inactive');
  }
  else {
    submitFormMestoButton.classList.remove('form__savebutton_inactive');
}
}




formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formProfileInputs.forEach(function(input) {
  const spanError = document.getElementById(`${input.id}-error`);
  input.addEventListener('input', function () {
    checkInputValidityProfile(input, spanError);
  });
});

formMestoInputs.forEach(function(input) {
  const spanError = document.getElementById(`${input.id}-error`);
  input.addEventListener('input', function () {
    checkInputValidityMesto(input, spanError);
  });
});