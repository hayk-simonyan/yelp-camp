const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f3c171a1efb5b1_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104490f3c171a1efb5b1_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104490f3c171a1efb5b1_340.jpg"}
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});


app.listen(3000, function() {
    console.log('YelpCamp Server is listening on port 3000');
});