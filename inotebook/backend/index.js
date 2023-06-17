const express = require('express');
const app = express();
const connectToMongo = require('./models/conn');

const PORT = 8000 || process.env.PORT;

connectToMongo();
app.use(express.json());

//available routes
app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(PORT,(req,res) =>{
    console.log(`server is running on port number ${PORT}`)
})