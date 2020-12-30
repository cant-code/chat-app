const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const secretOrPrivateKey = process.env.SECRET;
const verify = require('../utils/verifyToken');
const GroupChat = require('../models/GroupChat');
const Groups = require('../models/Groups');

let jwtUser = null;

router.use(function(req, res, next) {
    try {
        jwtUser = jwt.verify(verify(req), secretOrPrivateKey);
        next();
    } catch(e) {
        console.log(e);
        res.setHeader('Content-Type', 'application/json');
        res.sendStatus(401);
        res.end(JSON.stringify({ Error: 'Unauthorized'}));
    }
});

router.post('/', (req, res) => {
    let msg = new GroupChat({
        group: req.body.group,
        from: jwtUser.id,
        body: req.body.data,
    });

    msg.save((err, item) => {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.sendStatus(500);
            res.end(JSON.stringify({ error: 'Error' }));
        } else {
            GroupChat.aggregate([
                {
                    $match: {
                        _id: item._id
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'from',
                        foreignField: '_id',
                        as: 'fromObj'
                    }
                }
            ]).project({
                'fromObj.password': 0,
                'fromObj.date': 0
            }).exec((e, msg) => {
                if(e) {
                    console.log(e);
                    res.setHeader('Content-Type', 'application/json');
                    res.sendStatus(500);
                    res.end(JSON.stringify({ error: 'Error'}));
                } else {
                    req.io.to(String(msg[0].group)).emit('messages', msg[0]);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Success'}));
                }
            });
        }
    });
});

router.get('/query', (req,res) => {
    let user = mongoose.Types.ObjectId(jwtUser.id);
    let groupName = mongoose.Types.ObjectId(req.query.group);
    GroupChat.aggregate([
        {
            $match: {
                group: groupName,
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
    .project({
        'fromObj.password': 0,
        'fromObj.date': 0
    })
    .exec((err, msgs) => {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.sendStatus(500);
            res.end(JSON.stringify({ message: 'Failure' }));
        } else res.send(msgs);
    });
});

router.get('/', (req, res) => {
    let from = mongoose.Types.ObjectId(jwtUser.id);
    Groups.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'users',
                foreignField: '_id',
                as: 'fromObj',
            },
        },
    ])
    .match({ users: { $all: [{ $elemMatch: { $eq: from }}]}})
    .project({
        'fromObj.password': 0,
        'fromObj.date': 0,
    })
    .exec((err, groups) => {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.sendStatus(500);
            res.end(JSON.stringify({ message: 'Failure' }));
        } else res.send(groups);
    });
});

router.post('/room', (req, res) => {
    let type = req.body.type;
    if (type === 'Create') {
        let group = new Groups({
            username: req.body.name,
            users: [jwtUser.id]
        });
        group.save((err, item) => {
            if (err) {
                if (err.code === 11000)
                res.status(500).send(JSON.stringify({ error: 'Room already exists' }));
            } else res.status(200).send(item);
        });
    }
    else {
        Groups.aggregate([
            {
                $match: {
                    username: req.body.name,
                    users: {
                        $in: [mongoose.Types.ObjectId(jwtUser.id), "$users"]
                    }
                }
            }
        ])
        .exec((err, result) => {
            if (result.length > 0)
                res.status(400).send(JSON.stringify({ error: 'You have already joined this group' }));
            else {
                Groups.findOneAndUpdate(
                {
                    username: req.body.name
                },
                {
                    username: req.body.name,
                    $addToSet: { users: jwtUser.id }
                },
                { new: true, setDefaultsOnInsert: true },
                function(err, group) {
                    if(err) {
                        console.log(err);
                        res.setHeader('Content-Type', 'application/json');
                        res.sendStatus(500);
                        res.end(JSON.stringify({ message: 'Failure' }));
                    } else {
                        if (group === null) res.status(400).send(JSON.stringify({ error: 'Room not found' }));
                        else res.status(200).send(group);}
                });
            }
        });
    }
});

module.exports = router;