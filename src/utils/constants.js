const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__savebutton',
  inactiveButtonClass: 'form__savebutton_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};

const apiConfig = {
  token: '55c908bc-5ab9-4470-95d0-a17be91146e8',
  cohortId: 'cohort-60'
};

const buttonOpenAddCard = document.querySelector('.profile__button')
const buttonOpenEditProfile = document.querySelector('.profile__openpopup');
const inputEditProfileName = document.querySelector('.form__input_value_name');
const buttonOpenChangeAvatar = document.querySelector('.profile__avatar-button');
const inputEditProfileProfession = document.querySelector('.form__input_value_profession');

export {validationConfig, apiConfig, buttonOpenEditProfile, inputEditProfileName, inputEditProfileProfession, buttonOpenAddCard, buttonOpenChangeAvatar};