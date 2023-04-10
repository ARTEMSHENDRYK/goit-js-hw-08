import throttle from "lodash.throttle";

const formRef = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";
let userData = {};

readFromLocalStorage();

formRef.addEventListener("input", throttle(writeToLocalStorage, 500, { "trailing": false }));
formRef.addEventListener("submit", saveUserData);

function writeToLocalStorage(evt) {
  userData.email = formRef.email.value;
  userData.message = formRef.message.value; 
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userData));    
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
}

function readFromLocalStorage() {
  try {
    if (localStorage.getItem(LOCALSTORAGE_KEY)) {
      userData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
      formRef.email.value = userData.email;
      formRef.message.value = userData.message;    
    }
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
}

function saveUserData(evt) {
  evt.preventDefault();

  if (formRef.email.value === '' || formRef.message.value === '') {
    alert('Всі поля повинні бути заповнені!');
    return;
  }

  console.log(userData);
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}