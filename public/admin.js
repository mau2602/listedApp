// Admin portal DOM manipulation and data fetching

// Users 
const usersDiv = document.getElementById('users')
let prodsDiv = document.getElementById('products')
const adminMenu = document.createElement('p')
async function showUsers(data){
    data.data.forEach(user => {
    const userElement = document.createElement('p')
    userElement.innerHTML = `
        <strong>Username:</strong> ${user.username}<br>
        <strong>Email:</strong> ${user.email}<br>
        <strong>ID:</strong> ${user._id}<br><br>`
    usersDiv.appendChild(userElement)
})
usersDiv.appendChild(adminMenu)
}
document.getElementById('all-users').addEventListener('click', async ()  =>{
    try {
        const token = localStorage.getItem('token')
        if(!token){
            alert('User not authenticated. Log in first')
            return
        }
        const response = await axios.get('http://localhost:4000/api/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

        if (response.status === 200) {
                usersDiv.innerHTML = ''
                const data = response.data
                prodsDiv.innerHTML = ''
                adminMenu.innerHTML = `<button id='delete-user'>Delete</button>
                                       <input type="text" id="user-id-delete" placeholder="user ID" required>`
                showUsers(data)
        } else {
                console.error('Error fetching product:', response.status)
                alert('Error fetching product')
            }

        const deleteBtn = document.getElementById('delete-user')
        deleteBtn.addEventListener('click', async () => {
            const userId = document.getElementById('user-id-delete').value
                            
            if (!userId) {
                alert('Please provide a user ID');
                return;
            }
            try {
                const response = await axios.delete(`http://localhost:4000/api/users/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.status === 200) {
                    const data = await response.data
                    console.log('User deleted:', data)
                } else {
                    console.error('Error deleting user:', response.status)
                    alert('Error deleting user')
                }
            } catch (error) {
                console.error('Error during request:', error)
                alert('Error during request')
                }
            })
        } catch (error) {
                console.error('Error during fetch:', error)
            }

    })

// Products
const prodsBtn = document.getElementById('all-products')
prodsDiv = document.getElementById('products')
const adminDiv = document.getElementById('admin-div')
prodsBtn.addEventListener('click', async () => {
    usersDiv.innerHTML = ''
    prodsDiv.innerHTML = `<br><button id="new-product">New Product</button><br>
                          <button id="show-prods">Show Products</button><br><br>`
    
    const newProd = document.getElementById('new-product')
    newProd.addEventListener('click', async () => {
        adminDiv.innerHTML = ''
        const newProdForm = document.createElement('p')
        newProdForm.innerHTML =  `<input type="text" id="prod-name" placeholder="Name"><br>
                                  <input type="text" id="prod-cat" placeholder="Category"<br><br>
                                  <button id="save-prod">Save Product</button>`
        usersDiv.appendChild(newProdForm)
        const saveBtn = document.getElementById('save-prod')
        saveBtn.addEventListener('click', async () => {
            const name = document.getElementById('prod-name').value
            const category = document.getElementById('prod-cat').value
            try {
                if(!name || !category){
                    console.error('Name or category missing.')
                    return
                }
                const token = localStorage.getItem('token')
                if (!token) {
                    console.error('No token found, please log in.')
                    return
                }
                const response = await axios.post('http://localhost:4000/api/products',
                { name: name, category: category },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    const data = response.data
                    console.log('Product saved:', data)
                    document.getElementById('prod-name').value = ''
                    document.getElementById('prod-cat').value = ''
                } else {
                    console.error('Error saving product:', response.status)
                }

            } catch (error) {
                if (error.response) {
                    console.error('Error during request:', error.response.data)
                    console.error('Status code:', error.response.status)
                } else if (error.request) {
                    console.error('No response from server:', error.request)
                } else {
                    console.error('Error setting up request:', error.message)
                }
            }
        })
    })   
    const showProdsBtn = document.getElementById('show-prods')
    showProdsBtn.addEventListener('click', async () => {
        prodsDiv.innerHTML = ''
        const response = await fetch('http://localhost:4000/api/products')
        if(response.ok){
            const menuDiv = document.createElement('div')
            menuDiv.innerHTML = '<button id="delete-product">Delete Product</button><br><input id="prod-id-input" placeholder="Product ID"><br><br>'
            const data = await response.json()
            data.forEach(item => {
                const itemElement = document.createElement('p')
                itemElement.innerHTML = `<strong>Name:</strong> ${item.name}<br>
                                         <strong>Category:</strong> ${item.category}<br>
                                         <strong>ID:</strong> ${item._id}<br><br>`
                prodsDiv.appendChild(itemElement)
                prodsDiv.appendChild(menuDiv)
            })
        } else {
            console.error('Error showing products', response.status)
        }
        const deleteProdBtn = document.getElementById('delete-product')
        
        deleteProdBtn.addEventListener('click', async () => {
            const prodID = document.getElementById('prod-id-input').value
            if (!prodID) {
                alert('Please provide a product ID')
                return
            }
            try {
                const response = await fetch(`http://localhost:4000/api/products/${prodID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log('Product deleted:', data)
                } else {
                    console.error('Error deleting product:', response.status)
                }
            } catch (error) {
                console.error('Error during request:', error)
            }
        })
    })
})
// Log out 
const logout = document.getElementById('logout')
logout.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})