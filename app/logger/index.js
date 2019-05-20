'use strict';


var fs = require('fs');
var path = require('path');
var morgan = require('morgan');






morgan.token('body', function (req, res) { 
	return JSON.stringify(req.body) 
});
var optionS = {
	stream: fs.createWriteStream(path.join(__dirname,'socket.log'),{flags:'a'}),
	format: function (sock, args) { return { sock:sock.id, args: args}; }
};
var logF = ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]';
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
var postL = fs.createWriteStream(path.join(__dirname, 'bodyLog.log'), { flags: 'a' });
var bodyLog = morgan(logF,{ stream: postL });

var simpleLog = morgan('combined', { stream: accessLogStream });

var socketLog = require('socket.io-logger')(optionS);


module.exports = {
	socketLog:socketLog,
	simpleLog:simpleLog,
	bodyLog:bodyLog,
}
