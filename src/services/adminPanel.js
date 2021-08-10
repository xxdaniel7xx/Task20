import { User } from "../models/User";
import {addToStorage, getFromStorage} from "../utils";
import {appState} from "../app";
import {content} from "../app";
import taskFieldTemplate from "../templates/taskFieldUser.html";
import {newTaskModule} from "./newTask";

export function adminPanelModule() {
    const usersCol = document.getElementById('usersCol');
    const usersCont = document.getElementById('users');
    let tasksCol = document.getElementById('tasksCol')
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserForm = document.getElementById('addUserForm')
    const sbmtUserBtn = document.getElementById('sbmtUserBtn')
    const loginUserInp = document.getElementById('loginUserInp')
    const pswrdUserInp = document.getElementById('pswrdUserInp')

    const users = getFromStorage('users');

    let userInd = false

    //Filling page with existing users
    if (usersCont.children.length == 0) {

        for (let i = 1; i < users.length; i++) {

            const wrapper = document.createElement('div')
            const row = document.createElement('div')
            const btnsUser = document.createElement('div')
            const p = document.createElement('p')
            const delUserBtn = document.createElement('button');

            //Dom elements
            wrapper.appendChild(row).appendChild(p)
            row.appendChild(btnsUser)
            btnsUser.appendChild(delUserBtn)

            //css add
            wrapper.classList.add('wrapper', 'col-sm-12')
            row.classList.add('row')
            p.classList.add('col-sm-9')
            btnsUser.classList.add('col-sm-2', 'btns')
            btnsUser.hidden = true


            delUserBtn.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>\n' +
                '</svg>'

            //Events
            wrapper.addEventListener('mouseenter', (event) => {
                btnsUser.hidden = false
            })

            wrapper.addEventListener('mouseleave', (event) => {
                btnsUser.hidden = true
            })

            delUserBtn.addEventListener('click', () => {
                for (let i=0; i < users.length; i++) {
                    if (delUserBtn.parentElement.parentElement.firstChild.innerText == users[i].login) {
                        localStorage.removeItem(users[i].login)
                        users.splice(i,1);
                        localStorage.removeItem('users')
                        addToStorage(JSON.stringify(users), 'users')
                    }
                }
                delUserBtn.parentElement.parentElement.parentElement.remove()
            }, {once: true})

            p.innerHTML = users[i].login
            usersCont.appendChild(wrapper)

            //open task bar of selected user by click
            wrapper.addEventListener('click', () => {
                if (userInd) {
                    localStorage.removeItem(userInd)
                    addToStorage(tasksCol.innerHTML, userInd)
                }

                if (getFromStorage(wrapper.firstChild.firstChild.innerText).length != 0) {
                    tasksCol.innerHTML = getFromStorage(wrapper.firstChild.firstChild.innerText)
                }else {
                    tasksCol.innerHTML = taskFieldTemplate
                }


                newTaskModule(wrapper.firstChild.firstChild.innerText)
                userInd = wrapper.firstChild.firstChild.innerText
            })

        }
    } else {
        // get last state of page from local storage
        content.innerHTML = getFromStorage(appState.currentUser.login)
    }

    //add new user by button
    addUserBtn.addEventListener('click', function () {
        addUserBtn.hidden = true;
        addUserForm.hidden = false;
    })

    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const addUserFormData = new FormData(addUserForm);
        const newLogin = addUserFormData.get('newLogin');
        const newPassword = addUserFormData.get('newPassword');
        const newUser = new User(newLogin, newPassword);
        for (let i=0; i < users.length; i++){
            if (newUser.login == users[i].login ) {
                alert ('This User already exist!');
                loginUserInp.value =''
                pswrdUserInp.value =''
                return
            }
        }
        User.save(newUser);
        loginUserInp.value =''
        pswrdUserInp.value =''

        //the same code as above but for the new users
        const wrapper = document.createElement('div')
        const row = document.createElement('div')
        const btnsUser = document.createElement('div')
        const p = document.createElement('p')
        const delUserBtn = document.createElement('button');
        //Dom elements

        wrapper.appendChild(row).appendChild(p)
        row.appendChild(btnsUser)
        btnsUser.appendChild(delUserBtn)

        //css add

        wrapper.classList.add('wrapper', 'col-sm-12')
        row.classList.add('row')
        p.classList.add('col-sm-9')
        btnsUser.classList.add('col-sm-2', 'btns')
        btnsUser.hidden = true


        delUserBtn.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>\n' +
            '</svg>'


        wrapper.addEventListener('mouseenter', (event) => {
            btnsUser.hidden = false
        })

        wrapper.addEventListener('mouseleave', (event) => {
            btnsUser.hidden = true
        })

        delUserBtn.addEventListener('click', () => {
            for (let i=0; i < users.length; i++) {
                if (delUserBtn.parentElement.parentElement.firstChild.innerText == users[i].login) {
                    console.log(users)
                    localStorage.removeItem(users[i].login)
                    users.splice(i,1);
                    localStorage.removeItem('users')
                    localStorage.setItem('users', JSON.stringify(users))
                }
            }
            delUserBtn.parentElement.parentElement.parentElement.remove()
        }, {once: true})


        p.innerText = newLogin
        usersCont.appendChild(wrapper)

        addUserBtn.hidden = false;
        addUserForm.hidden = true;

        wrapper.addEventListener('click', (target) => {
            if (userInd) {
                localStorage.removeItem(userInd)
                addToStorage(tasksCol.innerHTML, userInd)
            }

            tasksCol.innerHTML = taskFieldTemplate
            // if (getFromStorage(wrapper.firstChild.firstChild.innerText).length != 0) {
            //     tasksCol.innerHTML = getFromStorage(wrapper.firstChild.firstChild.innerText)
            // }

            newTaskModule(wrapper.firstChild.firstChild.innerText)
            userInd = wrapper.firstChild.firstChild.innerText
            return userInd
        })
    })
}



