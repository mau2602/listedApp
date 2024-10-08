function verifyToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = 'index.html'
    }
}
verifyToken()

document.getElementById('show-lists').addEventListener('click', async () => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch('http://localhost:4000/api/users/lists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()
            const listItems = data.list
            displayList(listItems)
        } else {
            console.error('Error fetching lists:', response.status)
            alert('Error fetching lists')
        }
    } catch (error) {
        console.error('Error fetching lists:', error)
        alert('Error fetching lists')
    }
})

function displayList(lists) {
    const listsDiv = document.getElementById('lists-items')
    listsDiv.innerHTML = ''
    if (lists.length === 0) {
        listsDiv.innerHTML = '<p>You have no lists yet</p><br><button id="new-list-btn">Create New List</button>'
    } else {
const listBtn = document.getElementById('new-list-btn')
    listBtn.addEventListener('click', () => {
        listsDiv.innerHTML = '<input id="list-name" placeholder="New list name"><br><button id="create-list">Create</button>'
        const createBtn = document.getElementById('create-list')
        createBtn.addEventListener('click', async () => {
            const newListName = document.getElementById('list-name').value 
            const list = {"name": newListName, "products": []} 
            listsDiv.innerHTML = `<button id="add-products">Add products</button>`
            const addProdBtn = document.getElementById('add-products')
            addProdBtn.addEventListener('click', async () => {
                const response = await fetch('http://localhost:4000/api/products')
                if(response.ok){
                    const prodListDiv = document.createElement('div')
                    const data = await response.json()
                    data.forEach(item => {
                    const itemElement = document.createElement('p')
                    itemElement.innerHTML = `<strong>Name:</strong> ${item.name}<br>
                                             <strong>Category:</strong> ${item.category}<br>
                                             <button id="add-btn">ADD</button><br><br>`
                    prodListDiv.appendChild(itemElement)
                    listsDiv.appendChild(prodListDiv)
                    })
                }
            })
        })   
    })
    
    lists.forEach(item => {
        const itemDiv = document.createElement('div')
        itemDiv.textContent = item
        listsDiv.appendChild(itemDiv)
    });
    }
    
}
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})