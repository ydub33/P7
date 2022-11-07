const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likes: {
        type: [String]
    }
},
    {
        timestamps: true,
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);