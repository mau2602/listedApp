import category from "./category.js"
import cart from "./cart.js"
import pastaProducts from "./pastaProducts.js"
import meatProducts from "./meatProducts.js"
import beerProducts from "./beerProducts.js"

const beerList = ['Guinness', 'Brahma', 'Rosa Blanca', 'Patagonia', 'Nastro Azzurro', 'Ichnusa']
const meatList = ['Chicken', 'Beef', 'Pork', 'Fish', 'Lamb', 'Lobster']
const pastaList = ['DeCecco', 'Barilla', 'Gallo', 'Don Vicente']
const prodContainer = document.getElementById('prodContainer')
const contentDiv = document.getElementById('content')
const btnsDiv = document.createElement('div')
let cat = ''
let product = ''
let productObj = ''
let listName = ''

function content(){

    const listNameDiv = document.createElement('div')
    listName = document.getElementById('listName').value
    listNameDiv.innerText = `List: ${listName}`

    const beerButton = document.createElement('button')
    beerButton.id = 'beerButton'
    beerButton.className = "button"
    beerButton.innerText = 'Beer'
    const pastaButton = document.createElement('button')
    pastaButton.id = 'pastaButton'
    pastaButton.className = "button"
    pastaButton.innerText = 'Pasta'
    const meatButton = document.createElement('button')
    meatButton.id = 'meatButton'
    meatButton.className = "button"
    meatButton.innerText = 'Meat'

    btnsDiv.appendChild(beerButton)
    btnsDiv.appendChild(meatButton)
    btnsDiv.appendChild(pastaButton)
    contentDiv.innerHTML = ''
    contentDiv.appendChild(listNameDiv)
    contentDiv.appendChild(btnsDiv)

    btnsDiv.addEventListener('click', (event)=> {
        if(category(event.target.id) === 'beerButton'){
            cat = 'Beers'
            beerProducts(beerList)
        } else if (category(event.target.id) === 'meatButton'){
            cat = 'Meat'
            meatProducts(meatList)
        } else if (category(event.target.id) === 'pastaButton'){
            cat = 'Pasta'
            pastaProducts(pastaList)
        }
    })

    prodContainer.addEventListener('click', (event)=> {
        if(event.target.id === 'beerBtns' || event.target.id === 'meatBtns' || event.target.id === 'pastaBtns') {
            product = event.target.innerText
            productObj = { 'category': cat, 'product': product }
            cart(productObj)
        }
    })
}

export { content }
export default listName