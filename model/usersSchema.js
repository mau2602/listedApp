// User schema module
import { model, Schema } from 'mongoose'

const usersSchema = new Schema ({

    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user'},
    lists: { type: Array, default: []}
})

const User = model('User', usersSchema)

export default User