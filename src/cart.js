import cartRenderer from './cartRenderer.js'
import cartStorage from './cartStorage.js'

let cartArray = []

// Pushes the created item on an array and calls the rendering function cartRenderer()

function cart(prod){
        cartArray.push(prod)
        cartRenderer() 
        cartStorage(cartArray)
        return cartArray
    }

export {cartArray}
export default cart
