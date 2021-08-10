import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskFieldUser.html";
import adminFieldTemplate from "./templates/taskFieldAdmin.html";
import { User } from "./models/User";
import {addToStorage, getFromStorage} from "./utils";
import { generateUser} from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";

import {newTaskModule} from './services/newTask'
import {adminPanelModule} from "./services/adminPanel";

export const appState = new State();
const loginForm = document.querySelector("#app-login-form");
const loginInp = document.getElementById("loginInp");
const pswrdInp = document.getElementById("pswrdInp");
const logIn = document.getElementById("app-login-btn")
const logOut = document.getElementById("app-logout-btn");
export const content = document.getElementById('content')

//Generation of users
if (getFromStorage('users').length == 0) {
  generateUser(User)
};


//Login form
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  let span = document.createElement('span')
  span.id ='userName'


  if (authUser(login, password)) {
    loginInp.hidden = true;
    pswrdInp.hidden = true;
    logIn.hidden = true;
    logOut.hidden = false;

  } else {
    alert('Извините. Пользователь не найден. Доступ запрещен.');
    loginInp.hidden = false;
    pswrdInp.hidden = false;
    logIn.hidden = false;
    logOut.hidden = true;
  }


  //Selection of template between admin and common user
  if(appState.currentUser.login == 'a') {
    content.innerHTML = adminFieldTemplate

    adminPanelModule()
  } else {
    content.innerHTML = taskFieldTemplate
    newTaskModule(appState.currentUser.login)
  }



  //Login of current user at header
  span.innerHTML=appState.currentUser.login;
  logOut.before(span)

  //logout
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    loginInp.hidden = false;
    pswrdInp.hidden = false;
    loginInp.value = '';
    pswrdInp.value = '';
    logIn.hidden = false;
    logOut.hidden = true;

    // The local storage update
    localStorage.removeItem(appState.currentUser.login)
    localStorage.setItem(appState.currentUser.login, JSON.stringify(content.innerHTML))

    //Back to the start page
    document.getElementById('userName').remove();
    content.innerHTML = '<h1>Please Sign In to see your tasks!</h1>'
    return appState.currentUser = null
  })




  // Reload Notification
//   window.addEventListener('beforeunload', (event) => {
//     event.preventDefault()
//     event.returnValue = '';
//   })
});




//TODO ОФОРМЛЕНИЕ
//TODO Пользователь - адиминистратор, сохранение тасков в local storage
//TOsDO разделить код на модули, а то порнография какая-то




