const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
});

module.exports = Message = mongoose.model('groups', GroupsSchema);