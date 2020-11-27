const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');

const users = require('./routes/users');
const messages = require('./routes/messages');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log('Server is up on port' + port);
});

const io = require('socket.io').listen(server);

mongoose.connect(process.env.mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB successfully connected'))
.catch((e) => console.log(e));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.use('/api/users', users);
app.use('/api/messages', messages);