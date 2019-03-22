const express      = require('express'),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
const Campground = mongoose.model("Campground", campgroundSchema);

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

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) console.log(err);
        else res.render("index", {campgrounds: allCampgrounds});
    });
});

app.post("/campgrounds", function(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err)
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function() {
    console.log('YelpCamp Server is listening on port 3000');
});