// server.js

// modules =================================================
var express        = require('express');// call express
var app            = express();// define our app using express
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose   = require('mongoose');
var Leerkracht     = require('./app/models/leerkracht');

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
 mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app); // configure our routes

/*var mongoose   = require('mongoose');
var    Leerkracht=mongoose.model('Leerkracht');
    // create a new user
    var newUser = Leerkracht({
      username: 'TimD',
     firstname : 'Tim',
     lastname : 'Dams',
     email : 'Dams@ap.be',
     password: 'TD123',
    });

    // save the user
    newUser.save(function(err) {
      if (err) throw err;

      console.log('User created!');
    });*/
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;