const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupChatSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    from: {
        type: Schema.Types.ObjectId,
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

module.exports = Message = mongoose.model('groupchat', GroupChatSchema);