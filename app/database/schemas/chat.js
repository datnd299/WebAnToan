'use strict';

var Mongoose  = require('mongoose');

var ChatSchema = new Mongoose.Schema({
    user: { type: String, required: true },
    content: {type:String, default:null},
    time:{type:String,default:null}
});

var roomModel = Mongoose.model('chat', ChatSchema);

module.exports = roomModel;