const express        = require('express'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      expressSession = require('express-session');

const Campground = require('./models/campground'),
      Comment    = require('./models/comment'),
      User       = require('./models/user');

const campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes    = require('./routes/comments'),
      authRoutes       = require('./routes/auth');

const app = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp_6", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use(expressSession({
    secret: 'This is My Secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, function() {
    console.log('YelpCamp Server is listening on port 3000');
});
