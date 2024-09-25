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
    const { name, username, email, password } = req.body
    try {
        const userNameTaken = await User.findOne({ username })
        if (userNameTaken) return res.status(400).json({ message: 'Username already taken' })
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ name, username, email, password: hashedPassword })
        await newUser.save()
        
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error during registration' })
    }
})

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