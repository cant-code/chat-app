const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GlobalMessageSchema = new Schema({
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = GlobalMessage = mongoose.model('globalMessage', GlobalMessageSchema);