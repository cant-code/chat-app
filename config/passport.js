const passport_jwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passport_jwt;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const User = mongoose.model('users');
const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secret = process.env.SECRET;

module.exports = passport => {
    passport.use(
        new Strategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user) return done(null, user);
                    return done(null, false);
                })
                .catch(e => console.log(e));
        })
    );
};