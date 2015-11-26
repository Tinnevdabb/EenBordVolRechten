// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var Leerkracht   = require('../app/models/leerkracht');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(leerkracht, done) {
        done(null, leerkracht.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Leerkracht.findById(id, function(err, leerkracht) {
            done(err, leerkracht);
        });
    });

    passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      Leerkracht.findOne({ 'email' :  email }, function(err, leerkracht) {
          // if there are any errors, return the error before anything else
          if (err)
              return done(err);

          // if no user is found, return the message
          if (!leerkracht)
              return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

          // if the user is found but the password is wrong
          if (!leerkracht.validPassword(password))
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

          // all is well, return successful user
          return done(null, leerkracht);
      });

  }));



    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Leerkracht.findOne({ 'email' :  email }, function(err, leerkracht) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (leerkracht) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newLeerkracht            = new Leerkracht();

                // set the user's local credentials
                newLeerkracht.email    = email;
                newLeerkracht.password = newLeerkracht.generateHash(password);
                newLeerkracht.firstname= req.body.firstname,
                newLeerkracht.lastname= req.body.lastname,

                // save the user
                newLeerkracht.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newLeerkracht);
                });
            }

        });

        });

    }));

};
