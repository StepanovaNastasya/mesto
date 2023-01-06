const elementsTemplate = document.querySelector('#elements-grid__item-template').content;
const elementsContainer = document.querySelector('.elements-grid');

    
const profileNameText = document.querySelector('.profile__name');
const profileProfessionText = document.querySelector('.profile__profession');
const closeButtons = document.querySelectorAll('.popup__close');
const popupWindows = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__openpopup');
const editProfilePopup = document.querySelector('#popup-profile');
const editProfileNameInput = document.querySelector('.form__input_value_name');
const editProfileProfessionInput = document.querySelector('.form__input_value_profession');
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

function renderInitialCards() {
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

function closeModalByClickOutside(event) {
  const target = event.target;
  if (target.classList.contains('popup')) {
    closeVisiblePopup();
  }
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

    closePopup(editProfilePopup);
}

function addCard(evt) {
    evt.preventDefault();

    const imageNameValue = addCardImageNameInput.value;
    const imageLinkValue = addCardImageLinkInput.value;

    const card = createCard(imageNameValue, imageLinkValue);
    elementsContainer.prepend(card);

    closePopup(addCardPopup);

    addCardSaveForm.reset();
    addCardSaveButton.classList.add('form__savebutton_inactive');
}

renderInitialCards();
addListenersToClosePopupButtons();

editProfileButton.addEventListener('click', openEditPopup);
editProfileSaveForm.addEventListener('submit', changeProfile);

addCardButton.addEventListener('click', openAddCardPopup);
addCardSaveForm.addEventListener('submit', addCard);

window.addEventListener('click', closeModalByClickOutside);