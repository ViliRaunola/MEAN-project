const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connecting to a databse
mongoose.connect(config.database);

//When connection is established
mongoose.connection.on('connected', () => {
    console.log(`Yhdistäminen databassen: ${config.database} onnistui`);
});

//On Error
mongoose.connection.on('error', () => {
    console.log(`Yhdistäminen EPÄONNISTUI databassen: ${config.database}`);
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 8080; //8080

// Cors Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Passport Middleware

// These 6 lines are copied to make the passport.session to work. Otherwise it gave an error "TypeError: Cannot read property 'passport' of undefined"
//SOURCE: https://stackoverflow.com/questions/38017568/express-passport-session-not-working, 27/09/2021
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser());
app.use(session({ secret: 'secret',
                resave: true,
                saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Main page route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// This is for when the build is ready
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

//Creating the server
app.listen(port, () =>{
    console.log(`Serveri aloitettu portilla ${port}`);
});
