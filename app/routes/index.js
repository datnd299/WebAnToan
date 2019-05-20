'use strict';

var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');
var csrf = require('csurf')
var User = require('../models/user');
var Room = require('../models/room');
var csrfProtection = csrf({ cookie: true })
// Home page
router.get('/',csrfProtection, function(req, res, next) {
	if(req.isAuthenticated()){
		res.redirect('/rooms');
	}
	else{
		res.render('login', {
			success: req.flash('success')[0],
			errors: req.flash('error'), 
			showRegisterForm: req.flash('showRegisterForm')[0],
			csrfToken: req.csrfToken()
		});
	}
});

// Login
router.post('/login', csrfProtection, passport.authenticate('local', { 
	successRedirect: '/rooms', 
	failureRedirect: '/',
	failureFlash: true
}));

// Register 
router.post('/register',csrfProtection, function(req, res, next) {

	var credentials = {'username': req.body.username, 'password': req.body.password };

	if(credentials.username === '' || credentials.password === ''){
		req.flash('error', 'Missing credentials');
		req.flash('showRegisterForm', true);
		res.redirect('/');
	}else{
		User.findOne({'username': new RegExp('^' + req.body.username + '$', 'i'), 'socialId': null}, function(err, user){
			if(err) throw err;
			if(user){
				req.flash('error', 'Username already exists.');
				req.flash('showRegisterForm', true);
				res.redirect('/');
			}else{
				User.create(credentials, function(err, newUser){
					if(err) throw err;
					req.flash('success', 'Your account has been created. Please log in.');
					res.redirect('/');
				});
			}
		});
	}
});


// Rooms
router.get('/rooms', [User.isAuthenticated, function(req, res, next) {
	Room.find(function(err, rooms){
		if(err) throw err;
		res.render('rooms', { rooms });
	});
}]);

// Chat Room 
router.get('/chat/:id', [User.isAuthenticated, function(req, res, next) {
	var roomId = req.params.id;
	Room.findById(roomId, function(err, room){
		if(err) throw err;
		if(!room){
			return next(); 
		}
		console.log(room);
		
		res.render('chatroom', { user: req.user, room: room,messages:room.messages });
	});
	
}]);

// Logout
router.get('/logout', function(req, res, next) {

	req.logout();

	req.session = null;

	res.redirect('/');
});

module.exports = router;