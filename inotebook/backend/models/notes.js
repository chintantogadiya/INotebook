const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // this is like foreign key
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('notes', NotesSchema);