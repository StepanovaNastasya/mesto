import {initialCards, validationConfig} from '../utils/constants.js';
import {Card} from '../components/Card';
import { Section } from '../components/Section.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import './index.css'; 

let validatorFormProfile;
let validatorFormMesto;

const buttonOpenEditProfile = document.querySelector('.profile__openpopup');
const inputEditProfileName = document.querySelector('.form__input_value_name');
const inputEditProfileProfession = document.querySelector('.form__input_value_profession');

const buttonOpenAddCard = document.querySelector('.profile__button')
const inputAddCardName = document.querySelector('.form__input_value_image-name');
const inputAddCardLink = document.querySelector('.form__input_value_link');

const cardsSection = new Section({
  'items': initialCards,
  'renderer': function(card) {
    return createCard(card.name, card.link);
  }
}, '.elements-grid');

const popupEditProfile = new PopupWithForm('#popup-profile', changeProfile);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('#popup-mesto', addCard);
popupAddCard.setEventListeners();

const popupFullImage = new PopupWithImage('#popup-image');
popupFullImage.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__profession');

function createCard(name, link) {
  const card = new Card(name, link, '#elements-grid__item-template', popupFullImage.open.bind(popupFullImage));
  return card.render();
}

function renderInitialCards() {
  cardsSection.renderAll();
}
  
function openEditPopup() {
  validatorFormProfile.hideErrors();
  
  const userData = userInfo.getUserInfo();
  inputEditProfileName.value = userData.name;
  inputEditProfileProfession.value = userData.profession;

  popupEditProfile.open();
}

function changeProfile({name, profession}) {
    userInfo.setUserInfo({
      'name': name,
      'profession': profession
    });

    popupEditProfile.close();
}

function addCard({'form-name-image': name, 'form-mesto-link': link}) {
    cardsSection.prependItem(createCard(name, link));

    popupAddCard.close();
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
buttonOpenAddCard.addEventListener('click', () => {
  validatorFormMesto.disableButton();
  popupAddCard.open();
});