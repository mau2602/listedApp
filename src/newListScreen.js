import { newListName } from "./newListName.js"
import userSession from './logIn.js'

const contentDiv = document.getElementById('content')

function newListScreen(){
    const newListDiv = document.createElement('div')
    const newListBtn = document.createElement('button')
    const oldLists = document.createElement('div')

    newListBtn.id = 'newListBtn'
    newListBtn.innerText = 'New List'
    newListBtn.onclick =  newListName

    oldLists.innerText = 'No lists yet...'

    contentDiv.innerHTML = ''
    newListDiv.appendChild(newListBtn)
    newListDiv.appendChild(oldLists)
    contentDiv.appendChild(newListDiv)

    console.log(userSession)
}

export { newListScreen }