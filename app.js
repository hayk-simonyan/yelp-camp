const express      = require('express'),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose');

// models
const Campground = require('./models/campground');
const Comment    = require('./models/comment');

const seedDB = require('./seeds');

const app = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp_4", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
console.log(__dirname);
seedDB();


// Creating campground field in collection
// Campground.create(
//     {
//         name: "Salmon Creek", 
//         image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f3c171a1efb5b1_340.jpg",
//         description: "This is a huge granite hill"
//     }, function(err, campground) {
//         if(err) {
//             console.log('ERROR')
//             console.log(err);
//         } else {
//             console.log('Success')
//             console.log(campground);
//         }
//     }
// );

// const campgrounds = [
//     {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f3c171a1efb5b1_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104490f3c171a1efb5b1_340.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104490f3c171a1efb5b1_340.jpg"}
// ];

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - display all campgrounds
app.get("/campgrounds", function(req, res) {
    // GET all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) console.log(err);
        else res.render("campgrounds/index", {campgrounds: allCampgrounds});
    });
});

// CREATE - Add campground to DB
app.post("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - Shows info about one camp
app.get("/campgrounds/:id", function(req, res) {
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

// ========================
// COMMENTS ROUTES
// =======================

// NEW
app.get('/campgrounds/:id/comments/new', function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) console.log(err);
        else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// CREATE
app.post('/campgrounds/:id/comments', function(req, res) {
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
})

app.listen(3000, function() {
    console.log('YelpCamp Server is listening on port 3000');
});