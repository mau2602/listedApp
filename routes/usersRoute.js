import express from 'express'
import User from '../model/usersSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const usersRouter = express.Router()

// Get all users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json({ data: users })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' })
    }
})

// Register new user
usersRouter.post('/register', async (req, res) => {
    const { username, password, name, email } = req.body
    try {
        const userNameTaken = await User.findOne({ username })
        if (userNameTaken) return res.status(400).json({ message: 'Username already taken' })
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ username, password: hashedPassword, name, email, role: 'user', lists: [] })
        await newUser.save()
        
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error during registration', error: error.message})
    }
})
// user login
usersRouter.post('/login', async (req, res) => {

    const { username, password } = req.body
    
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
    
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' })
        }
    
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' })
        res.status(200).json({ message: 'Login successful', token, role: user.role })
    } catch (error) {
        console.error('Error during login:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Update a user
usersRouter.put('/lists', async (req, res) => {
    try{
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) return res.status(401).json({ message: 'Unauthorized. No token found' })
        const decoded = jwt.verify(token, 'your_jwt_secret')
        const user = await User.findById(decoded.id)
        if (!user) return res.status(404).json({ message: 'User not found' })

        res.status(200).json({ list: user.lists })
    } catch (error) {
        console.error('Error fetching lists:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// get user lists
usersRouter.get('/lists', async (req, res) => {
   
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) return res.status(401).json({ message: 'Unauthorized. No token found' })
        const decoded = jwt.verify(token, 'your_jwt_secret')
        const user = await User.findById(decoded.id)
        if (!user) return res.status(404).json({ message: 'User not found' })

        res.status(200).json({ list: user.lists })
    } catch (error) {
        console.error('Error fetching lists:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// Delete a user
usersRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) return res.status(404).json({ message: 'User not found' })
        res.json({ message: 'User deleted', deletedUser })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' })
    }
})

export default usersRouter