import {initialCards, validationConfig, apiConfig} from '../utils/constants.js';
import {Card} from '../components/Card';
import { Section } from '../components/Section.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import './index.css'; 
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import {Api} from '../components/Api.js';

let validatorFormProfile;
let validatorFormMesto;
let validatorFormAvatar;

const buttonOpenEditProfile = document.querySelector('.profile__openpopup');
const inputEditProfileName = document.querySelector('.form__input_value_name');
const inputEditProfileProfession = document.querySelector('.form__input_value_profession');

const buttonOpenAddCard = document.querySelector('.profile__button')

const buttonOpenChangeAvatar = document.querySelector('.profile__avatar-button');

let cardsSection;

const popupEditProfile = new PopupWithForm('#popup-profile', changeProfile);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('#popup-mesto', addCard);
popupAddCard.setEventListeners();

const popupFullImage = new PopupWithImage('#popup-image');
popupFullImage.setEventListeners();

const popupChangeAvatar = new PopupWithForm('#popup-chage-avatar', changeAvatar);
popupChangeAvatar.setEventListeners();

const popupWithAnswer = new PopupWithConfirm('#popup-answer', deleteCard);
popupWithAnswer.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');

const api = new Api(apiConfig);

function changeAvatar({'form-avatar-link': avatar}) {
  const newUserInfo = userInfo.getUserInfo();
  newUserInfo.avatar = avatar;

  return api.updateUserInfoAvatar(newUserInfo).then(result => {
    userInfo.setUserInfo(result);
    popupChangeAvatar.close();
  });
}

function deleteCard(card) {
  api.deleteCard(card.data()).then(skipped => {
    card.delete();
    popupWithAnswer.close();
  });
}

function createCard(data) {
  const currentUserId = userInfo.getUserInfo().id;
  const effectiveData = effectiveCard(data, currentUserId);

  const card = new Card(
    effectiveData, 
    '#elements-grid__item-template', 
    popupFullImage.open.bind(popupFullImage), 
    popupWithAnswer.open.bind(popupWithAnswer),
    (hadLike) => {
      if (!hadLike) {
        return api.addLike(effectiveData)
          .then(updatedCard => effectiveCard(updatedCard, currentUserId));
      } else {
        return api.removeLike(effectiveData)
          .then(updatedCard => effectiveCard(updatedCard, currentUserId));
      }
    });
  return card.render();
}

function renderInitialProfile() {
  return api.getUserInfo().then(result => {
    return userInfo.setUserInfo(result);
  });
}

function renderInitialCards() {
  api.getAllCards()
     .then(cards => {
      cardsSection = new Section({
        'items': cards,
        'renderer': function(card) {
          return createCard(card);
        }
      }, '.elements-grid');
      return cardsSection;
    })
    .then(section => section.renderAll());
}
  
function openEditPopup() {
  validatorFormProfile.hideErrors();
  
  const userData = userInfo.getUserInfo();
  inputEditProfileName.value = userData.name;
  inputEditProfileProfession.value = userData.profession;

  popupEditProfile.open();
}

function changeProfile({name, profession}) {
    const newUserInfo = userInfo.getUserInfo();
    newUserInfo.name = name;
    newUserInfo.profession = profession;

    return api.updateUserInfoTextContent(newUserInfo).then(result => {
      userInfo.setUserInfo(result);
      popupEditProfile.close();
    });
}

function addCard({'form-name-image': name, 'form-mesto-link': link}) {
    return api.addCard({
      name: name,
      link: link
    })
    .then(card => {
      cardsSection.prependItem(createCard(card));
      popupAddCard.close();
    })
}

function effectiveCard(card, currentUserId) {
  let result = card;
  result.likesCount = result.likesUserIds.length;
  result.isOwned = result.onwerId == currentUserId;
  result.isLiked = result.likesUserIds.includes(currentUserId);
  return result;
}

function enableFormsValidation(config){
  validatorFormProfile = new FormValidator(config, document.querySelector('#form-profile'));
  validatorFormProfile.enableValidation();

  validatorFormMesto = new FormValidator(config, document.querySelector('#form-mesto'));
  validatorFormMesto.enableValidation();

  validatorFormAvatar = new FormValidator(config, document.querySelector('#form-change-avatar'));
  validatorFormAvatar.enableValidation();  
}

renderInitialProfile().then(result => renderInitialCards());
enableFormsValidation(validationConfig);

buttonOpenEditProfile.addEventListener('click', openEditPopup);
buttonOpenAddCard.addEventListener('click', () => {
  validatorFormMesto.disableButton();
  popupAddCard.open();
});
buttonOpenChangeAvatar.addEventListener('click', () => {
  validatorFormAvatar.disableButton();
  popupChangeAvatar.open();
});