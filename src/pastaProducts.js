const prodContainer = document.getElementById('prodContainer')

// receives a products array and, turns it in products buttons and displays them

export default function pastaProducts(list){
  const pastaDiv = document.createElement('div')
  pastaDiv.id = 'pastaDiv'

  list.forEach(product => {
    const button = document.createElement('button')
    button.id = "pastaBtns"
    button.className = "button"
    button.textContent = product
    pastaDiv.appendChild(button)
    prodContainer.innerHTML = ''
    })
  prodContainer.appendChild(pastaDiv)
  
}
