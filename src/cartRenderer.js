import { cartArray } from "./cart.js"

const cartDiv = document.getElementById('cart')
const cartRend = document.createElement('div')

// displays cart content

export default function cartRenderer(){

    cartRend.innerHTML=''
    cartRend.className = 'cartRend'
    cartArray.forEach(item => {
        const li = document.createElement('li')
        li.textContent = `Category: ${item.category} - Product: ${item.product}.`
        cartRend.appendChild(li) 
    }); 
    cartDiv.appendChild(cartRend)  
}   
