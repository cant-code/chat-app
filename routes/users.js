const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const secretOrPrivateKey = process.env.SECRET;
const verify = require('../utils/verifyToken');
const validateRegistration = require('../utils/register');
const validateLogin = require('../utils/login');
const User = require('../models/User');

router.get('/', (req, res) => {
    try {
        let jwtUser = jwt.verify(verify(req), secretOrPrivateKey);
        let id = mongoose.Types.ObjectId(jwtUser.id);

        User.aggregate()
        .match({ _id: { $not: { $eq: id }}})
        .project({
            password: 0,
            date: 0,
        })
        .exec((e, users) => {
            if(e) {
                console.log(e);
                res.setHeader('Content-Type', 'application/json');
                res.sendStatus(500);
                res.end(JSON.stringify({ Error: 'error'}));
            }
            else res.send(users);
        });
    }
    catch (e) {
        console.log(e);
        res.setHeader('Content-Type', 'application/json');
        res.sendStatus(401);
        res.end(JSON.stringify({ Error: 'Unauthorized'}));
    }
});

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);
    if (!isValid) return res.status(400).json(errors);
    User.findOne({ username: req.body.username }).then(user => {
        if(user) return res.status(400).json({ error: 'User already exists'});
        else {
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => {
                        const payload = {
                            id: user.id,
                            email: user.email
                        };
                        req.io.sockets.emit('users', user.username);
                        res.status(200).json({
                            success: true,
                        });
                    }).catch(e => console.log(e));
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if(!isValid) return res.status(400).json(errors);
    const { username, password } = req.body;
    User.findOne({ username }).then(user => {
        if(!user) return res.status(404).json({ Error: 'User not found'});
        bcrypt.compare(password, user.password).then(found => {
            if(found) {
                const payload = {
                    id: user.id,
                    email: user.email
                };
                jwt.sign(
                    payload,
                    secretOrPrivateKey,
                    {
                        expiresIn: 31556926,
                    },
                    (e, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                            username: user.username,
                        });
                    }
                );
            } else {
                return res.status(400).json({ Error: 'Credentials do not match'});
            }
        });
    });
});

module.exports = router;