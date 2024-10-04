async function postFn(url, bodyObj) {
    const response = await axios.post(url, bodyObj,
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response
}

// Log in endpoint
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formObj = Object.fromEntries(formData.entries())
    
    try {
        const postUrl = 'http://localhost:4000/api/users/login'      
        const response = await postFn(postUrl, formObj)
 
        if (response.status === 200) {
            const data = await response.data
            localStorage.setItem('token', data.token)
            if(data.role === 'admin'){
                window.location.href = 'admin.html'
            } else {
                window.location.href = 'dashboard.html'
            }
        } else {
            alert('Login failed. Wrong username or password')
            console.error('Login failed:', response.status)
        }
    } catch (error) {
        console.error('Error during login:', error)
    }
})

// New user form and register endpoint
const landingDiv = document.getElementById('landing-div')
const newUserBtn = document.getElementById("new-user-btn")
newUserBtn.addEventListener('click', () => {
    landingDiv.innerHTML = `<form id='register-form' method='POST'> 
    <input type="text" name="username" placeholder="Username" required> 
    <input type="password" name="password" placeholder="Password" required> 
    <input type="text" name="name" placeholder="Name" required> 
    <input type="text" name="email" placeholder="Email" required> 
    <button type="submit">REGISTER</button> 
    </form>`

    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const formObj = Object.fromEntries(formData.entries())

        try {
            const postUrl = 'http://localhost:4000/api/users/register'
            const response = await postFn(postUrl, formObj)
        
            if (response.status === 201) {
                const data = await response.data
                console.log('User registered:', data)
                window.location.href = 'dashboard.html'
                console.log(response.status)
            } else {
                const errorData = await response.data
                console.error('Error response:', errorData)
                alert(`Error: ${errorData.message}`)
            }
        } catch (error) {
            console.error('Error registering user:', error)
            res.status(500).json({ message: 'Error during registration', error: error.message }) 
        }
    })
})
