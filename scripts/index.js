import {initialCards, validationConfig} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


const elementsContainer = document.querySelector('.elements-grid');

    
const profileNameText = document.querySelector('.profile__name');
const profileProfessionText = document.querySelector('.profile__profession');
const closeButtons = document.querySelectorAll('.popup__close');
const popupWindows = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__openpopup');
const editProfilePopup = document.querySelector('#popup-profile');
const editProfileNameInput = document.querySelector('.form__input_value_name');
const editProfileProfessionInput = document.querySelector('.form__input_value_profession');
const editProfileNameSpanError = document.querySelector(`#${editProfileNameInput.id}-error`);
const editProfileProfessionSpanError = document.querySelector(`#${editProfileProfessionInput.id}-error`);
const editProfileSaveForm = document.forms['form-profile'];

const addCardButton = document.querySelector('.profile__button')
const addCardPopup = document.querySelector('#popup-mesto');
const addCardImageNameInput = document.querySelector('.form__input_value_image-name');
const addCardImageLinkInput = document.querySelector('.form__input_value_link');
const addCardSaveButton = document.querySelector('#form__savebutton-mesto');
const addCardSaveForm = document.forms ['form-mesto'];

const fullImagePopup = document.querySelector('#popup-image');
const fullImagePopupImage = document.querySelector('.popup__image');
const fullImagePopupName = document.querySelector('.popup__description');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  
  window.removeEventListener('keydown', closeModalByEsc);
}

function closeVisiblePopup() {
  const visiblePopup = Array.from(popupWindows).find(function(popupWindow) {
    return popupWindow.classList.contains('popup_opened');
  });
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
    fullImagePopupImage.src = link;
    fullImagePopupImage.alt = name;
    fullImagePopupName.textContent = name;

    openPopup(fullImagePopup);
}

function renderInitialCards() {
  initialCards.forEach(function (item) {
    const card = new Card(item.name, item.link, '#elements-grid__item-template', openFullImagePopup);
    const elementItem = card.render();
    elementsContainer.append(elementItem);
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
    openPopup(editProfilePopup);  

    editProfileNameSpanError.classList.remove(validationConfig.errorClass); 
    editProfileNameSpanError.textContent = ''; 

    editProfileProfessionSpanError.classList.remove(validationConfig.errorClass); 
    editProfileProfessionSpanError.textContent = ''; 

    editProfileNameInput.classList.remove(validationConfig.inputErrorClass);
    editProfileNameInput.value = profileNameText.textContent;

    editProfileProfessionInput.classList.remove(validationConfig.inputErrorClass);
    editProfileProfessionInput.value = profileProfessionText.textContent;
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}     


function changeProfile(evt) {
    evt.preventDefault()
    profileNameText.textContent = editProfileNameInput.value;
    profileProfessionText.textContent = editProfileProfessionInput.value;

    closePopup(editProfilePopup);
}

function addCard(evt) {
    evt.preventDefault();

    const imageNameValue = addCardImageNameInput.value;
    const imageLinkValue = addCardImageLinkInput.value;

    const card = new Card(imageNameValue, imageLinkValue, '#elements-grid__item-template', openFullImagePopup);
    const elementItem = card.render();
    
    elementsContainer.prepend(elementItem);

    closePopup(addCardPopup);

    addCardSaveForm.reset();
    addCardSaveButton.classList.add('form__savebutton_inactive');
}

function enableFormsValidation(config){
  document.querySelectorAll(config.formSelector).forEach(function(form) {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();
  });
}

renderInitialCards();
addListenersToClosePopupButtons();
enableFormsValidation(validationConfig);

editProfileButton.addEventListener('click', openEditPopup);
editProfileSaveForm.addEventListener('submit', changeProfile);

addCardButton.addEventListener('click', openAddCardPopup);
addCardSaveForm.addEventListener('submit', addCard);

window.addEventListener('click', closeModalByClickOutside);