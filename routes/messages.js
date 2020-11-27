const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const secretOrPrivateKey = process.env.SECRET;
const verify = require('../utils/verifyToken');
const Message = require('../models/Message');
const Convo = require('../models/Conversation');
const Global = require('../models/GlobalMessage');

let jwtUser = null;

router.use(function(req, res, next) {
    try {
        jwtUser = jwt.verify(verify(req), secretOrPrivateKey);
        next();
    } catch(e) {
        console.log(e);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ Error: 'Unauthorized'}));
        res.sendStatus(401);
    }
});

router.get('/global', (req, res) => {
    Global.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'from',
                foreignField: '_id',
                as: 'fromObj',
            },
        },
    ])
    .project({
        'fromObj.password': 0,
        'fromObj.date': 0
    })
    .exec((e, msgs) => {
        if(e) {
            console.log(e);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Error'}));
            res.sendStatus(500);
        } else res.send(msgs);
    });
});

router.post('/global', (req, res) => {
    let msg = new Global({
        from: jwtUser.id,
        body: req.body.data,
    });

    req.io.sockets.emit('messages', req.body.data);

    msg.save(err => {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Error' }));
            res.sendStatus(500);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Success'}));
        }
    });
});

router.get('/convo', (req, res) => {
    let from = mongoose.Types.ObjectId(jwtUser.id);
    Convo.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'recipients',
                foreignField: '_id',
                as: 'recipientObj',
            },
        },
    ])
    .match({ recipients: { $all: [{ $elemMatch: { $eq: from }}]}})
    .project({
        'recipientObj.password': 0,
        'recipientObj.date': 0,
    })
    .exec((err, convos) => {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        } else res.send(convos);
    });
});

router.get('/convos/query', (req,res) => {
    let user1 = mongoose.Types.ObjectId(jwtUser.id);
    let user2 = mongoose.Types.ObjectId(req.query.userId);
    Message.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'to',
                foreignField: '_id',
                as: 'toObj',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'from',
                foreignField: '_id',
                as: 'fromObj',
            },
        },
    ])
    .match({
        $or: [
            { $and: [{ to: user1}, { from: user2}]},
            { $and: [{ to: user2}, { from: user1}]},
        ],
    })
    .project({
        'toObj.password': 0,
        'toObj.date': 0,
        'fromObj.password': 0,
        'fromObj.date': 0
    })
    .exec((err, msgs) => {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        } else res.send(msgs);
    });
});

router.post('/', (req,res) => {
    let from = mongoose.Types.ObjectId(jwtUser.id);
    let to = mongoose.Types.ObjectId(req.body.to);

    Convo.findOneAndUpdate(
    {
        recipients: {
            $all: [
                { $elemMatch: { $eq: from }},
                { $elemMatch: { $eq: to }},
            ],
        },
    },
    {
        recipients: [jwtUser.id, req.body.to],
        lastMessage: req.body.data,
        date: Date.now(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
    function(err, conversation) {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        } else {
            let message = new Message({
                conversation: conversation._id,
                to: req.body.to,
                from: jwtUser.id,
                body: req.body.data,
            });

            req.io.sockets.emit('messages', req.body.body);

            message.save(err => {
                if (err) {
                    console.log(err);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Failure' }));
                    res.sendStatus(500);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                        JSON.stringify({
                            message: 'Success',
                            conversationId: conversation._id,
                        })
                    );
                }
            });
        }
    });
});

module.exports = router;