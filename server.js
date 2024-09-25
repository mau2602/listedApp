import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import usersRouter from './routes/users.js'
import productsRouter from './routes/products.js'

const app = express()
const port = 4000
app.use(cors())
app.use(express.json())

// Database connection
mongoose.connect('mongodb://localhost/testing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB on'))
  .catch(err => console.error('Error trying to connect to MongoDB', err))

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)

app.listen(port, () => {
    console.log('Server on port '+ port)
})


// const User = require('./model/usersSchema')
// const Product = require('./model/productsSchema')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// // Get all users endpoint
// app.get('/api/users', async (req, res) => {
//     const data = await User.find()
//     res.json({data})
// })

// // password hashing fn
// async function hashPassword(password) {
//     const saltRounds = 12
//     const salt = await bcrypt.genSalt(saltRounds)
//     const hash = await bcrypt.hash(password, salt)
//     return hash
//   }

// // New user 
// app.post('/register', async (req, res) => {
//     const { name, username, email, password } = req.body
//     try {
//         const userNameTaken = await User.findOne({ username })
//         if(!userNameTaken){ 
//             const hashed = await hashPassword(password)
//             const newUser = new User ({ name, username, email, password: hashed })
//             await newUser.save()
//             res.status(201).json({ message: 'User succesfully registered' })  
//         } 
//     } catch (error) {
//         console.error('User already taken', error)
//     }
// })

// app.post('/login', async (req, res) => {

//     const { username, password } = req.body

//     try {
//         const user = await User.findOne({ username })
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' })
//         }

//         const validPassword = await bcrypt.compare(password, user.password)
//         if (!validPassword) {
//             return res.status(401).json({ error: 'Invalid password' })
//         }

//         const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' })

//         res.status(200).json({ message: 'Login successful', token, role: user.role })
//     } catch (error) {
//         console.error('Error during login:', error)
//         res.status(500).json({ error: 'Internal server error' })
//     }
// })
// // get determined user's lists
// app.get('/api/lists', async (req, res) => {
//     const token = req.headers['authorization']?.split(' ')[1]
//     if (!token) return res.status(401).json({ message: 'Unauthorized' })

//     try {
//         const decoded = jwt.verify(token, 'your_jwt_secret')
//         const user = await User.findById(decoded.id)
//         if (!user) return res.status(404).json({ message: 'User not found' })

//         res.status(200).json({ list: user.lists })
//     } catch (error) {
//         console.error('Error fetching lists:', error)
//         res.status(500).json({ message: 'Internal server error' })
//     }
// })
// // user delete 
// app.delete('/api/users/:id', async (req, res) => {
//     let id = req.params.id
//     try {
//     const deleted = await User.findByIdAndDelete(id)
//     console.log(deleted)
//     if(!deleted){
//         return res.status(404).json({message: 'ID not found'})
//     }
//     res.status(200).json({ message: 'Succesfully deleted', deleted})
//     } catch {
//         res.status(500).json({ message: 'Error during delete'})
//     }
// })
// // product add
// app.post('/api/products', async (req, res) => {
//     const { name, category } = req.body
//     try {
//         const newProduct = new Product({ name: name, category: category })
//         const added = await newProduct.save()
//         return res.status(200).json({ message: "Product added", added })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Internal server error' })
//     }
// })
// // show all products
// app.get('/api/products', async (req, res) => {
//     const data = await Product.find()
//     res.json(data)
// })

// // delete product by id
// app.delete('/api/products/:id', async (req, res) => {
//     let id = req.params.id
//     console.log(id)
//     try {
//         const deleted = await Product.findByIdAndDelete(id)
//         console.log(deleted)
//         if(!deleted){
//             console.error('error deleting')
//             return res.status(404).json({ message: 'Could not delete. Product not found' })
//         } 
//         res.status(200).json({ message: 'Product deleted', deleted})
//     } catch {
//         return res.status(500).json({ message: 'Internal server error'})
//     }
// })
