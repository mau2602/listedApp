// Products module
import { model, Schema } from 'mongoose'

const productsSchema = new Schema ({

    name: { type: String, required: true, unique: true },
    category: { type: String, required: true},
})

const Product = model('Product', productsSchema)

export default Product