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
    try {
        const { name, category } = req.body
        if (!name || !category) {
            return res.status(400).json({ message: 'Name and category are required' })
        }
        const product = new Product({ name, category })
        await product.save()

        res.status(200).json({ message: 'Product saved successfully', product })
    } catch (error) {
        console.error('Error saving product:', error.message)
        res.status(500).json({ message: 'Internal server error', error: error.message })
    }
})

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