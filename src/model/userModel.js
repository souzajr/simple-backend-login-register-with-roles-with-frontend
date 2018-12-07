const moongoose = require('mongoose')
const UserSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    deletedAt: {
        type: String,
        required: false
    }
})


moongoose.model('User', UserSchema)