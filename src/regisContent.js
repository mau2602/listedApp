import { newListScreen } from "./newListScreen.js"
import { userRegis } from "./newUser"

const content = document.getElementById('content')

function regisContent (){

    const regDiv = document.createElement('div')
    regDiv.id = 'regDiv'
    const inputUsername = document.createElement("input")
    inputUsername.type = "text"
    inputUsername.name = "user"
    inputUsername.placeholder = "Username"
    inputUsername.id = 'username'
    inputUsername.required = true
    regDiv.appendChild(inputUsername)

    const inputEmail = document.createElement("input")
    inputEmail.type = "text"
    inputEmail.name = "email"
    inputEmail.placeholder = "Email"
    inputEmail.id = 'email'
    inputEmail.required = true
    regDiv.appendChild(inputEmail)

    const inputPassword = document.createElement("input")
    inputPassword.type = "password"
    inputPassword.name = "password"
    inputPassword.placeholder = "Password"
    inputPassword.id = 'pass'
    inputPassword.required = true
    regDiv.appendChild(inputPassword)

    const regisButton = document.createElement("button")
    regisButton.type = "button"
    regisButton.innerText = "Registrate"
    regisButton.className = 'registrate'
    regisButton.onclick = newListScreen
    regDiv.appendChild(regisButton)

    content.innerHTML = ''
    
    content.appendChild(regDiv)
}

export { regisContent }