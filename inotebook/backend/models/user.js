const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email is already exists"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date : {
        type : Date,
        default : Date.now,
    }
}/*, { timestamps: true } we can also use this */);

module.exports = mongoose.model('user', userSchema);