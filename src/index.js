import _ from 'lodash'
import { validateUser } from './logIn.js'
import usersArray from './users.js'
import { regisContent } from './regisContent.js'

const logInBtn = document.getElementById('log-in')
logInBtn.addEventListener('click', () => {
    validateUser(usersArray)
})
const newUserBtn = document.getElementById('register')
newUserBtn.addEventListener('click', () => {
    regisContent()  
})

