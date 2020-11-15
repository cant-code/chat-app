import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log('Server is up on port' + port);
});

const io = require('socket.io').listen(server);