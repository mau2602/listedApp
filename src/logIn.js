import { newListScreen } from "./newListScreen.js"

const contentDiv = document.getElementById('content')
let userSession = ''
function validateUser(array){

    const userBtn = document.getElementById('user').value
    const passBtn = document.getElementById('password').value

    if(userBtn == '' || passBtn == ''){
        alert('Please fullfill required data')
    } else {
        const userFound = array.find(item => item.user === userBtn)

        if(userFound != undefined && userFound.password === passBtn){
            contentDiv.innerHTML = ''
            userSession = userBtn
            newListScreen()
            console.log(userSession)
            return 
        } else {
            alert('Wrong username or password. Try again')
            return
        }
    } return
}  
  export { validateUser }
  