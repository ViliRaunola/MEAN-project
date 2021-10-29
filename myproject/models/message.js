const mongoose = require('mongoose');


//Message Schema
const MessageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.ObjectId
    },
    reciverId: {
        type: mongoose.ObjectId
    },
    text: {
        type: String
    },
    time: {
        type: Date, default: Date.now //Source: https://stackoverflow.com/questions/10006218/which-schematype-in-mongoose-is-best-for-timestamp
    }

});