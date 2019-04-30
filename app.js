const express        = require('express'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      methodOvveride = require('method-override'),
      
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      expressSession = require('express-session'),

      flash = require('connect-flash');


const Campground = require('./models/campground'),
      Comment    = require('./models/comment'),
      
      User       = require('./models/user');

const campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes    = require('./routes/comments'),
      authRoutes       = require('./routes/auth');

const seedDB = require('./seeds');

const app = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp_13", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOvveride('_method'));

app.use(flash());
seedDB();

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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, function() {
    console.log('YelpCamp Server is listening');
});
