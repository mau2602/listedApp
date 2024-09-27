import express from 'express'
import Product from '../model/productsSchema.js'
import User from '../model/usersSchema.js'
const productsRouter = express.Router()

// Get all products
productsRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
})

// Create new product
productsRouter.post('/', async (req, res) => {
    const { name, category } = req.body
    try {
        const newProduct = new Product({ name, category })
        const savedProduct = await newProduct.save()
        res.status(201).json({ message: 'Product added', savedProduct })
    } catch (error) {
        res.status(500).json({ message: 'Error saving product' })
    }
});

// Delete product
productsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' })
        res.json({ message: 'Product deleted', deletedProduct })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' })
    }
})
// Endpoint 
productsRouter.get('/:id', async (req, res) => {
    let id = req.params.id
    try {
        const user = await User.findById(id)

    } catch {

    }
})

export default productsRouter 