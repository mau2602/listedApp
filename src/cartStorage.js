function cartStorage(cart){
    let stringedCart = JSON.stringify(cart)
    localStorage.setItem('carro', stringedCart)
}

export default cartStorage