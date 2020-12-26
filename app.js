const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');

const users = require('./routes/users');
const messages = require('./routes/messages');
const groups = require('./routes/groupchat');
var clients = require('./utils/clientData');

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

const io = require('socket.io')(server);

io.on("connection", (socket) => {
    socket.on('rooms', () => {
        io.emit('rooms', socket.rooms);
    });
    socket.on('clientInfo', (data) => {
        clients[data.id] = socket.id;
    });
    socket.on('disconnect', () => {
        for (let i in clients) {
            if (clients[i] === socket.id) delete clients[i];
        }
        for (let i in socket.rooms) socket.leave(i);
    });
    socket.on('joingroup', (item) => {
        socket.join(item);
    });
    socket.on('endgroup', (item) => {
        socket.leave(item);
    });
});

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
app.use('/api/group', groups);