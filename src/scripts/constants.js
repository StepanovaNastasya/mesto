import cyprus from '../images/cyprus.jpg';
import georgia from '../images/georgia.jpg';
import paris from '../images/paris.jpg';
import saintp from '../images/saint-p.jpg';
import hamburg from '../images/hamburg-docks.jpg';
import slovenia from '../images/slovenia.jpg';

const initialCards = [
  {
    name: 'Кипр',
    link: cyprus
  },
  {
    name: 'Грузия',
    link: georgia
  },
  {
    name: 'Париж',
    link: paris
  },
  {
    name: 'Гамбург',
    link: hamburg
  },
  {
    name: 'Санкт-Петербург',
    link: saintp
  },
  {
    name: 'Словения',
    link: slovenia
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

export {initialCards, validationConfig };