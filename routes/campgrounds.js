const express = require('express');

const Campground = require('../models/campground');
// we're nott specifying the filse, so this will require the index.js === V12
const middleware = require('../middleware');

const router = express.Router();

// INDEX - display all campgrounds
router.get("/", function(req, res) {
    // GET all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) console.log(err);
        else res.render("campgrounds/index", {campgrounds: allCampgrounds,/*currentUser: req.user*/});
    });
});

// CREATE - Add campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    // add author to the campground
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {name: name, image: image, description: desc, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW - Display Form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - Shows info about one camp
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err) {
            console.log(err)
        } else {
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT ================================ V10
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
                res.render('campgrounds/edit', {campground: foundCampground});
    });
});

// UPDATE ============================== V10
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect('/campgrounds');
            console.log(err);
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY ============================= V10
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) res.redirect('/campgrounds');
        else res.redirect('/campgrounds');
    });
});

module.exports = router;