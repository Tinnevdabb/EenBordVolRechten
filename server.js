// server.js

// modules =================================================
var express        = require('express');// call express
var app            = express();// define our app using express
var port = process.env.PORT || 8080;// set our port
var path     = require('path'); //Add path into our required list
var cookieParser = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose   = require('mongoose');
var passport = require('passport');
var morgan       = require('morgan');
var session      = require('express-session');

//for password forgot
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var async = require('async');


var db = require('./config/db');// config files
// configuration ===========================================

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
 mongoose.connect(db.url);

 require('./config/passport')(passport); // pass passport for configuration

 // set up our express application
 app.use(morgan('dev')); // log every request to the console
 app.use(cookieParser()); // read cookies (needed for auth)
 app.use(bodyParser.json());// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
 app.use(bodyParser.json({ type: 'application/vnd.api+json' }));// parse application/vnd.api+json as json
 app.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded




// required for passport
app.use(session({secret: 'hello'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, '/public')));

// routes ==================================================
require('./app/routes/routes')(app, passport); // configure our routes
require('./app/routes/lessenRoutes')(app, passport); // configure our routes
require('./app/routes/loginRoutes')(app, passport); // configure our routes
require('./app/routes/vragenRoutes')(app, passport); // configure our routes
require('./app/routes/presentatieRoutes')(app, passport); // configure our routes
require('./app/routes/antwoordRoutes')(app, passport); // configure our routes
require('./app/routes/forgotRoutes')(app, passport,nodemailer,crypto,async); // configure our routes


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
