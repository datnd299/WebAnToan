'use strict';

var Mongoose  = require('mongoose');

/**
 * Each connection object represents a user connected through a unique socket.
 * Each connection object composed of {userId + socketId}. Both of them together are unique.
 *
 */
var ChatSchema = new Mongoose.Schema({
    user: { type: String, required: true },
    content: {type:String, default:null},
    time:{type:String,default:null}
});

var roomModel = Mongoose.model('chat', ChatSchema);

module.exports = roomModel;