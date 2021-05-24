import {showToastMsg, removeItemToastMsg} from '/js/toast.js';

const username = document.querySelector("#username");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const form = document.querySelector("form");
const button = document.querySelector("form > button");

let usernameReady = false;
let emailReady = false;
let messageReady = false;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const API_CONTACT = "https://kronos.kandz.me/wp/wp-json/contact-form-7/v1/contact-forms/5/feedback";

button.disabled = true;

username.addEventListener("blur", () => { 
  if (username.value.length < 3){
    showToastMsg("Please enter a user name, minimum 3 characters", "username", 0);
    usernameReady = false;
  } else {
    removeItemToastMsg("username");
    usernameReady = true;
  }
  checkForm()
});

message.addEventListener("input", () => { 
  if (message.value.length < 10){
    showToastMsg("Please enter a message, minimum 10 characters", "message", 0);
    messageReady = false;
  } else {
    removeItemToastMsg("message");
    messageReady = true;
  }
  checkForm()
});

email.addEventListener("blur", () => { 
  if (!regexEmail.test(email.value)){
    showToastMsg("Please enter a valid email address", "email", 0);
    emailReady = false;
  } else {
    removeItemToastMsg("email");
    emailReady = true;
  }
  checkForm()
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data = new FormData();  
  data.append("your-name", username.value);
  data.append("your-email", email.value);
  data.append("your-subject", "CS Museum");
  data.append("your-message", message.value);

  fetch(API_CONTACT, {
    method: "POST",
    redirect: "follow",
    body: data
  })
  .then (res => res.json())
  .then (json => {
    showToastMsg(json.message, "contact",1);
  })
  .catch(e => {
    showToastMsg("Something went wrong, we are sorry.", "contact", 0);
  })
})


function checkForm(){
  if (emailReady && usernameReady && messageReady) button.disabled = false;
  else button.disabled = true;
}
