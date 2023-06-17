const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(
        url,
        (err) => {
            if (err) console.log(err)
            else console.log("mongodb is connected");
        }
    );
}

module.exports = connectToMongo;