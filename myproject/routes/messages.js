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
    //console.log("Ollaan inboxissa");

    Message.findAllReceivedPrivateMessages(req.user._id, (err, messages) => {
        if(err) throw err;
        if(!messages){
            return res.json({success: false, msg: 'No received messages'});
        }else{
            res.json({success: true, messages: messages});
        }
    });
});

//Fetching the users sent messages
router.get('/sent', passport.authenticate('jwt', {session:false}), (req, res , next) => {

    Message.findAllSentMessages(req.user._id, (err, messages) => {
        if(err) throw err;
        if(!messages){
            return res.json({success: false, msg: 'No sent messages'});
        }else{
            res.json({success: true, messages: messages});
        }
    });

});

//TODO Add a global message fetching API



module.exports = router;