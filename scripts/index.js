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
const closeButton = document.querySelectorAll('.popup__close');

const editProfileButton = document.querySelector('.profile__openpopup');
const editProfilePopup = document.getElementById('popup-profile');
const editProfileCloseButton = document.getElementById('popup__close-profile');
const editProfileNameInput = document.querySelector('.form__input_value_name');
const editProfileProfessionInput = document.querySelector('.form__input_value_profession');
const editProfileSaveForm = document.getElementById('form-profile');

const addCardButton = document.querySelector('.profile__button')
const addCardPopup = document.getElementById('popup-mesto');
const addCardCloseButton = document.getElementById('popup__close-mesto');
const addCardImageNameInput = document.querySelector('.form__input_value_image-name');
const addCardImageLinkInput = document.querySelector('.form__input_value_link');
const addCardSaveForm = document.getElementById('form-mesto');

const fullImagePopup = document.getElementById('popup-image');
const fullImagePopupCloseButton = document.getElementById('popup__close-image');
const fullImagePopupImage = document.querySelector('.popup__image');
const fullImagePopupName = document.querySelector('.popup__description');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function makeLike(evt) {
   let likeButton = evt.target;
   likeButton.classList.toggle("selected");
} 

function deleteCard(evt) {
    let trashButton = evt.target;
    trashButton.parentElement.parentElement.remove();
}

function openFullImagePopup(evt) {
    let targetImage = evt.target;
    fullImagePopupImage.src = targetImage.src;
    fullImagePopupImage.alt = targetImage.alt;
    fullImagePopupName.textContent = targetImage.alt;

    openPopup(fullImagePopup);
}

function closeFullImagePopup () {
  closePopup(fullImagePopup);
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
  
function openEditPopup() {
    openPopup(editProfilePopup);  

    editProfileNameInput.value = profileNameText.textContent;
    editProfileProfessionInput.value = profileProfessionText.textContent;
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}     


function changeProfile(evt) {
    evt.preventDefault()
    profileNameText.textContent = editProfileNameInput.value;
    profileProfessionText.textContent = editProfileProfessionInput.value;

    closeEditPopup();
}

function addCard(evt) {
    evt.preventDefault();

    const imageNameValue = addCardImageNameInput.value;
    const imageLinkValue = addCardImageLinkInput.value;

    const card = createCard(imageNameValue, imageLinkValue);
    elementsContainer.insertBefore(card, elementsContainer.firstChild);

    closeAddCardPopup();
}

function closeEditPopup () {
  closePopup(editProfilePopup);
}

function closeAddCardPopup () {
    closePopup(addCardPopup);

    addCardImageNameInput.value = '';
    addCardImageLinkInput.value = '';
}

init();

editProfileButton.addEventListener('click', openEditPopup);
editProfileCloseButton.addEventListener('click', closeEditPopup);
editProfileSaveForm.addEventListener('submit', changeProfile);

addCardButton.addEventListener('click', openAddCardPopup);
addCardCloseButton.addEventListener('click', closeAddCardPopup);
addCardSaveForm.addEventListener('submit', addCard);

fullImagePopupCloseButton.addEventListener('click', closeFullImagePopup);
