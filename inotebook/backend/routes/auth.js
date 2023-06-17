const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = 'secret@code';

//Route 1:  create a user using post
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const seccPass = await bcrypt.hash(req.body.password, salt);

        const user = User({
            "name": req.body.name,
            "email": req.body.email,
            "password": seccPass
        });

        user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.send(authtoken);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }

})

//Route 2: login user
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "Invalid credentials"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({ error: "Invalid credentials" })
        }

        const data = {
            user : {
            id : user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.send(authtoken);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }

})

//Route 3: Get user details
router.post("/getuser",fetchUser, async (req,res) =>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")

        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }
})

module.exports = router;