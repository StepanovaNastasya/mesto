let openPopup = document.querySelector('.form__button');
let popupBg = document.querySelector('.popup__bg');
let closePopup = document.querySelector('.popup__close');
let popupName = document.querySelector('.popup__name');
let popupProfession = document.querySelector('.popup__profession');
let popupSave = document.querySelector('.popup__savebutton');
let formName = document.getElementById('form__name');
let formProfession = document.getElementById('form__profession');

function open() {
    popupBg.classList.add('active');   
    
    popupName.value = formName.textContent;
    popupProfession.value = formProfession.textContent;
}

function change() {
    formName.textContent = popupName.value
    formProfession.textContent = popupProfession.value

    close();
}

function close () {
    popupBg.classList.remove('active'); 

    popupProfession.value = '';
    popupName.value = '';
}

openPopup.addEventListener('click', open);
closePopup.addEventListener('click', close);
popupSave.addEventListener('click', change);

