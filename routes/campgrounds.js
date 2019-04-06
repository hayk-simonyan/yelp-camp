const express = require('express');

const Campground = require('../models/campground');

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
router.post("/", function(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc};
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
router.get("/new", function(req, res) {
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

module.exports = router;