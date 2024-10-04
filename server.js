import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRouter from './routes/usersRoute.js'
import productsRouter from './routes/productsRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 4000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(cors({
  origin: 'http://127.0.0.1:5500', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// Database connection
mongoose.connect('mongodb://localhost/testing')       //     {useNewUrlParser: true,  useUnifiedTopology: true} -- deprecated
  .then(() => console.log('MongoDB ON'))
  .catch(err => console.error('Error trying to connect to MongoDB', err))

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)

app.listen(port, () => {
    console.log('Server on port '+ port)
})
