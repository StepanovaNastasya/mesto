let openPopup = document.querySelector('.profile__openpopup');
let popupBg = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let popupName = document.querySelector('.form__input_value_name');
let popupProfession = document.querySelector('.form__input_value_profession');
let popupSave = document.querySelector('.form');
let formName = document.querySelector('.profile__name');
let formProfession = document.querySelector('.profile__profession');

function open() {
    popupBg.classList.add('popup_opened');   
    
    popupName.value = formName.textContent;
    popupProfession.value = formProfession.textContent;
}

function change(evt) {
    formName.textContent = popupName.value;
    formProfession.textContent = popupProfession.value;

    close();
    evt.preventDefault()
}

function close () {
    popupBg.classList.remove('popup_opened'); 
}

openPopup.addEventListener('click', open);
closePopup.addEventListener('click', close);
popupSave.addEventListener('submit', change);

