'use strict';

var Mongoose  = require('mongoose');


var RoomSchema = new Mongoose.Schema({
    title: { type: String, required: true },
    connections: { type: [{ userId: String, socketId: String }]},
    messages:{type: [{ userId: String,username:String, message: String, time: Number }]}
});

var roomModel = Mongoose.model('room', RoomSchema);

module.exports = roomModel;