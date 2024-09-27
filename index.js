
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formObj = Object.fromEntries(formData.entries())

    try {
        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        })

        if (response.ok) {
            const data = await response.json()
            console.log('Login successful:', data)
            localStorage.setItem('token', data.token)
            if(data.role === 'admin'){
                window.location.href = 'admin.html'
            } else {
                window.location.href = 'dashboard.html'
            }
        } else {
            console.error('Login failed:', response.status)
        }
    } catch (error) {
        console.error('Error during login:', error)
    }
})
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
        const response = await fetch('http://localhost:4000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        })
        if (response.ok) {
            const data = await response.json()
            console.log('User registered:', data)
            window.location.href = 'dashboard.html'
        } else {
            const error = await response.json()
            console.error('Error response:', error) 
        }
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'Error during registration', error: error.message }) 
    }
})
})
