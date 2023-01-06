const initialCards = [
  {
    name: 'Кипр',
    link: './images/cyprus.jpg'
  },
  {
    name: 'Грузия',
    link: './images/georgia.jpg'
  },
  {
    name: 'Париж',
    link: './images/paris.jpg'
  },
  {
    name: 'Гамбург',
    link: './images/hamburg-docks.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/saint-p.jpg'
  },
  {
    name: 'Словения',
    link: './images/slovenia.jpg'
  }
];

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__savebutton',
  inactiveButtonClass: 'form__savebutton_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};