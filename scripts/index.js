import {initialCards, validationConfig} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


let validatorFormProfile;
let validatorFormMesto;

const elementsContainer = document.querySelector('.elements-grid');

    
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const closeButtons = document.querySelectorAll('.popup__close');

const buttonOpenEditProfile = document.querySelector('.profile__openpopup');
const popupEditProfile = document.querySelector('#popup-profile');
const inputEditProfileName = document.querySelector('.form__input_value_name');
const inputEditProfileProfession = document.querySelector('.form__input_value_profession');
const formEditProfile = document.forms['form-profile'];

const buttonOpenAddCard = document.querySelector('.profile__button')
const popupAddCard = document.querySelector('#popup-mesto');
const inputAddCardName = document.querySelector('.form__input_value_image-name');
const inputAddCardLink = document.querySelector('.form__input_value_link');
const buttonAddCard = document.querySelector('#form__savebutton-mesto');
const formAddCard = document.forms ['form-mesto'];

const popupFullImage = document.querySelector('#popup-image');
const imagePopupFullImage = document.querySelector('.popup__image');
const descriptionPopupFullImage = document.querySelector('.popup__description');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  
  window.removeEventListener('keydown', closeModalByEsc);
}

function closeVisiblePopup() {
  const visiblePopup = document.querySelector('.popup_opened');
  closePopup(visiblePopup);
}

function closeModalByEsc(event) {
  if (event.code === "Escape") {
    closeVisiblePopup();
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  
  window.addEventListener('keydown', closeModalByEsc);
}

function openFullImagePopup(name, link) {
    imagePopupFullImage.src = link;
    imagePopupFullImage.alt = name;
    descriptionPopupFullImage.textContent = name;

    openPopup(popupFullImage);
}

function createCard(name, link) {
  const card = new Card(name, link, '#elements-grid__item-template', openFullImagePopup);
  return card.render();
}

function renderInitialCards() {
  initialCards.forEach(function (item) {
    elementsContainer.append(createCard(item.name, item.link));
  });
}

function addListenersToClosePopupButtons() {
  closeButtons.forEach(function(closeButton) {
    const popup = closeButton.closest('.popup');

    closeButton.addEventListener('click', function() {
      closePopup(popup);
    });
  });
}

function closeModalByClickOutside(event) {
  const target = event.target;
  if (target.classList.contains('popup')) {
    closeVisiblePopup();
  }
}
  
function openEditPopup() {
  validatorFormProfile.hideErrors();
  
  inputEditProfileName.value = profileName.textContent;
  inputEditProfileProfession.value = profileProfession.textContent;

  openPopup(popupEditProfile);  
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}     


function changeProfile(evt) {
    evt.preventDefault()
    profileName.textContent = inputEditProfileName.value;
    profileProfession.textContent = inputEditProfileProfession.value;

    closePopup(popupEditProfile);
}

function addCard(evt) {
    evt.preventDefault();

    const valueImageName = inputAddCardName.value;
    const valueImageLink = inputAddCardLink.value;

    elementsContainer.prepend(createCard(valueImageName, valueImageLink));

    closePopup(popupAddCard);

    formAddCard.reset();
    validatorFormMesto.disableButton();
}

function enableFormsValidation(config){
  validatorFormProfile = new FormValidator(config, document.querySelector('#form-profile'));
  validatorFormProfile.enableValidation();

  validatorFormMesto = new FormValidator(config, document.querySelector('#form-mesto'));
  validatorFormMesto.enableValidation();
}

renderInitialCards();
addListenersToClosePopupButtons();
enableFormsValidation(validationConfig);

buttonOpenEditProfile.addEventListener('click', openEditPopup);
formEditProfile.addEventListener('submit', changeProfile);

buttonOpenAddCard.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', addCard);

window.addEventListener('click', closeModalByClickOutside);