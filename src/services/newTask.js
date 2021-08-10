import {getFromStorage, addToStorage} from "../utils";
import {appState, content} from "../app";
import dragula from "../../node_modules/dragula/dragula";
import {taskGen} from "../utils";

export function newTaskModule (userName) {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const readyCol = document.getElementById('readyCol');
    const ready = document.getElementById('ready');
    const inProgress = document.getElementById('inProgress');
    const finished = document.getElementById('finished');
    const sbmtTaskBtn = document.getElementById('sbmtTaskBtn');
    const inputTask = document.createElement('input');
    const addBtns = document.getElementById('addDelBtns')

    // let arrCol =[ready, inProgress, finished]
    // if (getFromStorage(userName).length !=0) {
    //     tasksCol.innerHTML = getFromStorage(userName)
    //
    //     }
    addTaskBtn.addEventListener('click', function() {
        addTaskBtn.hidden = true;
        sbmtTaskBtn.hidden = false;
        addTaskBtn.before(inputTask)
    })

    sbmtTaskBtn.addEventListener('click', function() {
        if (inputTask.value != "") {
            // taskGen()
            const wrapperTask = document.createElement('div')
            const row = document.createElement('div')
            const btns = document.createElement('div')
            let p = document.createElement('p')
            let delBtn = document.createElement('button');
            let changeBtn = document.createElement('button');
            //Dom elements
            wrapperTask.appendChild(row).appendChild(p)
            row.appendChild(btns)
            btns.appendChild(changeBtn)
            btns.appendChild(delBtn)

            //css add

            wrapperTask.classList.add('wrapperTask', 'col-sm-12')
            row.classList.add('row')
            p.classList.add('col-sm-9')
            btns.classList.add('col-sm-2', 'offset-1', 'btns')
            delBtn.classList.add('delBtn')

            delBtn.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>\n' +
                '</svg>'
            changeBtn.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>\n' +
                '  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>\n' +
                '</svg>'

            wrapperTask.addEventListener('mouseenter', (event) => {
                btns.hidden = false
            })

            wrapperTask.addEventListener('mouseleave', (event) => {
                btns.hidden = true
            })

            btns.hidden = true
            p.innerText = inputTask.value
            ready.appendChild(wrapperTask)
            inputTask.value = '';
            addBtns.removeChild(inputTask);
            addTaskBtn.hidden = false;
            sbmtTaskBtn.hidden = true;


            delBtn.addEventListener('click', () => {

                delBtn.parentElement.parentElement.parentElement.remove()
                localStorage.removeItem(userName)
                // addToStorage(tasksCol.innerHTML, userName)

            })

            changeBtn.addEventListener('click', () => {

                let sib = changeBtn.parentElement.parentElement
                let yesBtn = document.createElement('button')
                let noBtn = document.createElement('button')
                inputTask.value = sib.firstChild.textContent

                changeBtn.hidden = true
                delBtn.hidden = true
                addTaskBtn.hidden = true
                yesBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>`
                noBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>`
                sib.lastChild.appendChild(yesBtn)
                sib.lastChild.appendChild(noBtn)
                sib.firstChild.hidden = true;
                sib.firstChild.after(inputTask)
                sib.children[1].classList.add('col-sm-8', 'offset-1', 'inputCh')

                yesBtn.addEventListener('click', () => {
                    sib.firstChild.innerText = sib.children[1].value
                    sib.children[1].value = ''
                    sib.children[1].remove()
                    sib.firstChild.hidden = false
                    sib.lastChild.lastChild.remove()
                    sib.lastChild.lastChild.remove()
                    changeBtn.hidden = false
                    delBtn.hidden = false
                    addTaskBtn.hidden = false
                    localStorage.removeItem(userName)
                    addToStorage(tasksCol.innerHTML, userName)
                })

                noBtn.addEventListener('click', () => {
                    sib.children[1].value = ''
                    sib.children[1].remove()
                    sib.firstChild.hidden = false
                    sib.lastChild.lastChild.remove()
                    sib.lastChild.lastChild.remove()
                    changeBtn.hidden = false
                    delBtn.hidden = false
                    addTaskBtn.hidden = false
                })
            })

            localStorage.removeItem(userName)

            addToStorage(tasksCol.innerHTML, userName)
        } else {
            alert('Введите задачу')
        }

    })
    //Drag&Drop plugin use
    dragula([ready, inProgress, finished], {mirrorContainer: ready})

}





