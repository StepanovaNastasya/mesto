import {initialCards, validationConfig} from './scripts/constants.js';
import {Card} from './scripts/Card';
import { Section } from './scripts/Section.js';
import {FormValidator} from './scripts/FormValidator.js';
import {PopupWithImage} from './scripts/PopupWithImage.js';
import {PopupWithForm} from './scripts/PopupWithForm.js';
import {UserInfo} from './scripts/UserInfo.js';
import './pages/index.css'; 

let validatorFormProfile;
let validatorFormMesto;

const elementsContainer = document.querySelector('.elements-grid');

const buttonOpenEditProfile = document.querySelector('.profile__openpopup');
const inputEditProfileName = document.querySelector('.form__input_value_name');
const inputEditProfileProfession = document.querySelector('.form__input_value_profession');

const buttonOpenAddCard = document.querySelector('.profile__button')
const inputAddCardName = document.querySelector('.form__input_value_image-name');
const inputAddCardLink = document.querySelector('.form__input_value_link');

const popupEditProfile = new PopupWithForm('#popup-profile', changeProfile);
const popupAddCard = new PopupWithForm('#popup-mesto', addCard);
const popupFullImage = new PopupWithImage('#popup-image');
const userInfo = new UserInfo('.profile__name', '.profile__profession');

function createCard(name, link) {
  const card = new Card(name, link, '#elements-grid__item-template', popupFullImage.open.bind(popupFullImage));
  return card.render();
}

function renderInitialCards() {
  const section = new Section({
    'items': initialCards,
    'renderer': function(card) {
      return createCard(card.name, card.link);
    }
  }, '.elements-grid');
  section.renderAll().forEach(element => section.addItem(element));
}
  
function openEditPopup() {
  validatorFormProfile.hideErrors();
  
  const userData = userInfo.getUserInfo();
  inputEditProfileName.value = userData.name;
  inputEditProfileProfession.value = userData.profession;

  popupEditProfile.open();
}

function changeProfile(evt) {
    evt.preventDefault();

    userInfo.setUserInfo({
      'name': inputEditProfileName.value,
      'profession': inputEditProfileProfession.value
    });

    popupEditProfile.close();
}

function addCard(evt) {
    evt.preventDefault();

    const valueImageName = inputAddCardName.value;
    const valueImageLink = inputAddCardLink.value;

    elementsContainer.prepend(createCard(valueImageName, valueImageLink));

    popupAddCard.close();
    validatorFormMesto.disableButton();
}

function enableFormsValidation(config){
  validatorFormProfile = new FormValidator(config, document.querySelector('#form-profile'));
  validatorFormProfile.enableValidation();

  validatorFormMesto = new FormValidator(config, document.querySelector('#form-mesto'));
  validatorFormMesto.enableValidation();
}

renderInitialCards();
enableFormsValidation(validationConfig);

buttonOpenEditProfile.addEventListener('click', openEditPopup);
buttonOpenAddCard.addEventListener('click', popupAddCard.open.bind(popupAddCard));