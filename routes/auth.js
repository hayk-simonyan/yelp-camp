const express = require('express'),
      passport = require('passport');

const User = require('../models/user');

const router = express.Router();

// load landing page
router.get("/", function(req, res) {
    res.render("landing");
});

// show register form
router.get('/register', function(req, res) {
    res.render('register');
});

// handle signup logic
router.post('/register', function(req, res) {
    const newUser = new User({username: req.body.username});
    const password = req.body.password;
    User.register(newUser, password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/campgrounds');
        });
    });
});

// show login form
router.get('/login', function(req, res) {
    res.render('login');
});

// handle login logic
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
    }), function(req, res) {}
);

// logout logic
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});

// middleware authentication
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;