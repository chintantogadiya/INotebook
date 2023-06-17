const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchuser");
const Notes = require('../models/notes');

//Route 1: Get all the notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }
})

//Route 2: Add a new note
router.post('/addnote', fetchUser, [
    body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const newNote = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await newNote.save();
        res.json(saveNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }

})

//Route 3: Update a note
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id)

        // if note is not exists
        if (!note) {
            return res.status(404).send("Not found!")
        }
        // if userid is not match with stored user's id (allowes updation only if user's owened note)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }
})

//Route 3: delete a note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id)

        // if note is not exists
        if (!note) {
            return res.status(404).send("Not found!")
        }
        // if userid is not match with stored user's id (allowes updation only if user's owened note)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send("successfully deleted note")
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }
})

module.exports = router;