const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
});

module.exports = Message = mongoose.model('groups', GroupsSchema);