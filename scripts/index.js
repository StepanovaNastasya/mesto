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

const elementsTemplate = document.getElementById('elements-grid__item-template').content;
const elementsContainer = document.querySelector('.elements-grid');

    
const profileNameText = document.querySelector('.profile__name');
const profileProfessionText = document.querySelector('.profile__profession');
const closeButtons = document.querySelectorAll('.popup__close');
const popupWindows = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__openpopup');
const editProfilePopup = document.getElementById('popup-profile');
const editProfileNameInput = document.querySelector('.form__input_value_name');
const editProfileProfessionInput = document.querySelector('.form__input_value_profession');
const editProfileSaveForm = document.forms['form-profile'];

const addCardButton = document.querySelector('.profile__button')
const addCardPopup = document.getElementById('popup-mesto');
const addCardImageNameInput = document.querySelector('.form__input_value_image-name');
const addCardImageLinkInput = document.querySelector('.form__input_value_link');
const addCardSaveForm = document.forms ['form-mesto'];

const fullImagePopup = document.getElementById('popup-image');
const fullImagePopupImage = document.querySelector('.popup__image');
const fullImagePopupName = document.querySelector('.popup__description');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function makeLike(evt) {
   const likeButton = evt.target;

   likeButton.classList.toggle("selected");
} 

function deleteCard(evt) {
    evt.target.closest('.elements-grid__item').remove();
}

function openFullImagePopup(evt) {
    const targetImage = evt.target;

    fullImagePopupImage.src = targetImage.src;
    fullImagePopupImage.alt = targetImage.alt;
    fullImagePopupName.textContent = targetImage.alt;

    openPopup(fullImagePopup);
    window.addEventListener('click', closeModal);
}

function createCard(name, link) {
    const elementItem  = elementsTemplate.cloneNode(true);
    const elementImage = elementItem.querySelector('.elements-grid__image');
    

    elementItem.querySelector('.elements-grid__title').textContent = name;  
    elementImage.src = link;
    elementImage.alt = name; 

    elementItem.querySelector('.elements-grid__button').addEventListener('click', makeLike);
    elementItem.querySelector('.elements-grid__trash').addEventListener('click', deleteCard);
    elementImage.addEventListener('click', openFullImagePopup);

    return elementItem;
}

function init() {
  initialCards.forEach(function (item) {
    const elementItem = createCard(item.name, item.link);
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

function closeModal(event) {
  const target = event.target;
  if (target === editProfilePopup || target === addCardPopup) {
    popupWindows.forEach(function(closeModalwindow) {
      closePopup(closeModalwindow);
    });
  }
}
  
function openEditPopup() {
    openPopup(editProfilePopup);  

    editProfileNameInput.value = profileNameText.textContent;
    editProfileProfessionInput.value = profileProfessionText.textContent;
    window.addEventListener('click', closeModal);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
  window.addEventListener('click', closeModal);
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

    const card = createCard(imageNameValue, imageLinkValue);
    elementsContainer.prepend(card);

    closePopup(addCardPopup);

    addCardImageNameInput.value = '';
    addCardImageLinkInput.value = '';
}

init();
addListenersToClosePopupButtons();

editProfileButton.addEventListener('click', openEditPopup);
editProfileSaveForm.addEventListener('submit', changeProfile);

addCardButton.addEventListener('click', openAddCardPopup);
addCardSaveForm.addEventListener('submit', addCard);