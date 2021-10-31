const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const passport = require('passport');
const config = require('../config/database');
const User = require('../models/user');


//Adding a message to database
// 
router.post('/add', (req, res, next) => {


    User.getUserByUsername(req.body.receiverUsername, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User was not found. Please try again.'});
        }

        let newMessage = new Message({
            senderId: req.body.senderId,
            receiverId: user._id,
            text: req.body.text
        });
    
        Message.addMessage(newMessage, (err, message) => {
            if(err){
                res.json({success: false, msg:'Failed to send the message.'});
            }else{
                res.json({success: true, msg:'Message sent!'});
            }
        });
    });
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

router.get('/public', (req, res, next) => {
    Message.findAllPublicMessages((err, messages) =>{
        if(err) throw err;
        if(!messages){
            return res.json({success: false, msg: 'No received messages'});
        }else{
            res.json({success: true, messages: messages});
        }
    });
});



module.exports = router;