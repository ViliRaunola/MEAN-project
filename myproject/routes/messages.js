const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const passport = require('passport');


//Adding a message to database
router.post('/add', (req, res, next) => {
    let newMessage = new Message({
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        text: req.body.text
    });

    Message.addMessage(newMessage, (err, message) => {
        if(err){
            res.json({success: false, msg:'Failed to send the message'});
        }else{
            res.json({success: true, msg:'Message sent'});
        }
    })

});

//Fetching the users recived messages
router.get('/inbox', passport.authenticate('jwt', {session:false}), (req, res , next) => {
    //res.json({user: req.user});
    console.log("Ollaan inboxissa");
});



module.exports = router;