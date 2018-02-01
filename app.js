const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const users = require('./routes/users');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database);

// check connection
mongoose.connection.on('connected', () => {
    console.log(`Server connected to database ${config.database}`);
});

// check error
mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
})

// initialize app
const app = express();

// set static folder middleware
app.use(express.static(path.join(__dirname, 'public')));

// cors middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// users routes middleware
app.use('/users', users);

// port number
const port = 3000;

// default route
app.get('/', (req, res) => {
    res.send('It works!');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// start server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})