let initialCards = [
  {
    name: 'Кипр',
    link: './images/cyprus.jpg',
    alt: 'кипр'
  },
  {
    name: 'Грузия',
    link: './images/georgia.jpg',
    alt: 'грузия'
  },
  {
    name: 'Париж',
    link: './images/paris.jpg',
    alt: 'париж'
  },
  {
    name: 'Гамбург',
    link: './images/hamburg-docks.jpg',
    alt: 'гамбург'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/saint-p.jpg',
    alt: 'санкт-петербург'
  },
  {
    name: 'Словения',
    link: './images/slovenia.jpg',
    alt: 'словения'
  }
];

const elementsTemplate = document.getElementById('elements-grid__item-template').content;
const elementsContainer = document.querySelector('.elements-grid');
    
let profileNameText = document.querySelector('.profile__name');
let profileProfessionText = document.querySelector('.profile__profession');


const editProfileButton = document.querySelector('.profile__openpopup');
const editProfilePopup = document.getElementById('popup-profile');
const editProfileCloseButton = document.getElementById('popup__close-profile');
const editProfileNameInput = document.querySelector('.form__input_value_name');
const editProfileProfessionInput = document.querySelector('.form__input_value_profession');
const editProfileSaveButton = document.getElementById('form__savebutton-profile');

const addCardButton = document.querySelector('.profile__button')
const addCardPopup = document.getElementById('popup-mesto');
const addCardCloseButton = document.getElementById('popup__close-mesto');
const addCardImageNameInput = document.querySelector('.form__input_value_image-name');
const addCardImageLinkInput = document.querySelector('.form__input_value_link');
const addCardSaveButton = document.getElementById('form__savebutton-mesto');

function createCard(name, link) {
    const elementItem  = elementsTemplate.cloneNode(true);

    elementItem.querySelector('.elements-grid__title').textContent = name;  
    elementItem.querySelector('.elements-grid__image').src = link;
    elementItem.querySelector('.elements-grid__image').alt = name; 

    return elementItem;
}

const createElements = initialCards.forEach(function (item) {

    const elementItem = createCard(item.name, item.link);
     
    elementsContainer.append(elementItem);
  });
  
function openEditPopup() {
    editProfilePopup.classList.add('popup_opened');   

    editProfileNameInput.value = profileNameText.textContent;
    editProfileProfessionInput.value = profileProfessionText.textContent;
}

function openAddCardPopup() {
    addCardPopup.classList.add('popup_opened');
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
    editProfilePopup.classList.remove('popup_opened'); 
}

function closeAddCardPopup () {
    addCardPopup.classList.remove('popup_opened'); 

    addCardImageNameInput.value = '';
    addCardImageLinkInput.value = '';
}

editProfileButton.addEventListener('click', openEditPopup);
editProfileCloseButton.addEventListener('click', closeEditPopup);
editProfileSaveButton.addEventListener('submit', changeProfile);

addCardButton.addEventListener('click', openAddCardPopup);
addCardCloseButton.addEventListener('click', closeAddCardPopup);
addCardSaveButton.addEventListener('click', addCard);

