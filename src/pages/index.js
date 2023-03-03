import {validationConfig, apiConfig, buttonOpenEditProfile, inputEditProfileName, inputEditProfileProfession, buttonOpenAddCard, buttonOpenChangeAvatar} from '../utils/constants.js';
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

  const submitButtonOldText = popupChangeAvatar.getSubmitButtonText();
  popupChangeAvatar.setSubmitButtonText('Сохранение...');

  api.updateUserInfoAvatar(newUserInfo)
    .then(result => {
      userInfo.setUserInfo(result);
      popupChangeAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupChangeAvatar.setSubmitButtonText(submitButtonOldText));
}

function deleteCard(card) {
  api.deleteCard(card.data())
    .then(skipped => {
      card.delete();
      popupWithAnswer.close();
    })
    .catch(err => console.log(err));
}

function createCard(data) {
  data.currentUserId = userInfo.getUserInfo().id;
  
  const card = new Card(
    data, 
    '#elements-grid__item-template', 
    popupFullImage.open.bind(popupFullImage), 
    popupWithAnswer.open.bind(popupWithAnswer),
    (hadLike) => {
      if (!hadLike) {
        return api.addLike(data);
      } else {
        return api.removeLike(data);
      }
    });
  return card.render();
}

function renderInitialState() {
  api.getUserInfo()
    .then(result => userInfo.setUserInfo(result))
    .then(skipped => api.getAllCards())
    .then(cards => {
      cardsSection = new Section({
        'items': cards,
        'renderer': function(card) {
          return createCard(card);
        }
      }, '.elements-grid');
      return cardsSection;
    })
    .then(section => section.renderAll())
    .catch(err => console.log(err));
}
  
function openEditPopup() {
  validatorFormProfile.hideErrors();
  
  const userData = userInfo.getUserInfo();
  inputEditProfileName.value = userData.name;
  inputEditProfileProfession.value = userData.profession;

  popupEditProfile.open();
}

function changeProfile({name, profession}) {
    const newUserInfo = {
      'name': name,
      'profession': profession
    };
    
    const submitButtonOldText = popupEditProfile.getSubmitButtonText();
    popupEditProfile.setSubmitButtonText('Сохранение...');

    api.updateUserInfoTextContent(newUserInfo)
      .then(result => {
        userInfo.setUserInfo(result);
        popupEditProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupEditProfile.setSubmitButtonText(submitButtonOldText));
}

function addCard({'form-name-image': name, 'form-mesto-link': link}) {
  const submitButtonOldText = popupAddCard.getSubmitButtonText();
  popupAddCard.setSubmitButtonText('Сохранение...');

  api.addCard({name: name, link: link})
    .then(card => {
      cardsSection.prependItem(createCard(card));
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddCard.setSubmitButtonText(submitButtonOldText));
}

function enableFormsValidation(config){
  validatorFormProfile = new FormValidator(config, document.querySelector('#form-profile'));
  validatorFormProfile.enableValidation();

  validatorFormMesto = new FormValidator(config, document.querySelector('#form-mesto'));
  validatorFormMesto.enableValidation();

  validatorFormAvatar = new FormValidator(config, document.querySelector('#form-change-avatar'));
  validatorFormAvatar.enableValidation();  
}

renderInitialState();
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