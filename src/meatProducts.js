
const prodContainer = document.getElementById('prodContainer')

// receives a products array and, turns it in products buttons and displays them

export default function meatProducts(list){
  const meatDiv = document.createElement('div')
  meatDiv.id = 'meatDiv'

  list.forEach(product => {
    const button = document.createElement('button')
    button.id = "meatBtns"
    button.className = "button"
    button.textContent = product
    meatDiv.appendChild(button)
    prodContainer.innerHTML = ''
  })
  prodContainer.appendChild(meatDiv)
}

