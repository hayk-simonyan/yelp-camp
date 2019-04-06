const express = require('express');

const Campground = require('../models/campground');
const Comment    = require('../models/comment');

const router = express.Router({mergeParams: true});

// NEW
router.get('/new',/*middleware=>*/ isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) console.log(err);
        else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// CREATE
router.post('/',/*middleware=>*/ isLoggedIn, function(req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            res.redirect('/campgrounds');
            console.log(err);
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    res.redirect('/campgrounds');
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
            // connect new comment to campground
            // redirect campground show page
        }
    })
});

// middleware authentication
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;