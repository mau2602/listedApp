import usersArray from "./users.js"
import { content } from "./content.js"

const contentDiv= document.getElementById('content')

function idGenerator(){
 
    let newID = ''
    let lastID = parseInt(usersArray[usersArray.length-1].ID)
    if(lastID == undefined){
      newID = 0
    } else newID = lastID + 1
  
    return newID
  }

function userRegis(){

    const newUsername = document.getElementById('username').value
    const newEmail = document.getElementById('email').value
    const newPass = document.getElementById('pass').value

   const user = { user: newUsername, password: newPass, email: newEmail,  id: idGenerator(), cart: [] } 
   contentDiv.innerHTML = ''
   content()
   
}

export { userRegis }