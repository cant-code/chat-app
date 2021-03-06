const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);