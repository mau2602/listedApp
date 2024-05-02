import { content } from "./content.js"

const newListDiv = document.createElement('div')
const contentDiv = document.getElementById('content')

function newListName(){
    const listNameInput = document.createElement('input')
    listNameInput.id = 'listName'
    listNameInput.placeholder = 'New list name'
    newListDiv.appendChild(listNameInput)

    const listNameBtn = document.createElement('button')
    listNameBtn.id = 'listNameBtn'
    listNameBtn.innerText = 'Create new list'
    listNameBtn.onclick = content
    newListDiv.appendChild(listNameBtn)

    contentDiv.innerHTML = ''
    contentDiv.appendChild(newListDiv)

    return //lastName
}

export { newListName }