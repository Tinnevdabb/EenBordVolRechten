// server.js

// modules =================================================
var express        = require('express');// call express
var app            = express();// define our app using express
var port = process.env.PORT || 8080;// set our port
var bodyParser     = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var mongoose   = require('mongoose');
var passport = require('passport');

var flash    = require('connect-flash');
var Leerkracht     = require('./app/models/leerkracht');

var session      = require('express-session');

var db = require('./config/db');// config files
// configuration ===========================================

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
 mongoose.connect(db.url);

 require('./config/passport')(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));// parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override'));
// required for passport
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
