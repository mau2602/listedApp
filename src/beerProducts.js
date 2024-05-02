const prodContainer = document.getElementById('prodContainer')

// receives a products array and, turns it in products buttons and displays them

export default function beerProducts(list){
  const beersDiv = document.createElement('div')
  beersDiv.id = 'beersDiv'

  list.forEach(product => {
  const button = document.createElement('button')
  button.id = "beerBtns"
  button.className = "button"
  button.textContent = product
  beersDiv.appendChild(button)
  prodContainer.innerHTML = ''
})
prodContainer.appendChild(beersDiv)
}
