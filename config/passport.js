// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var models   = require('../app/models/leerkracht');

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
        models.Leerkracht.findById(id, function(err, leerkracht) {
            done(err, leerkracht);
        });
    });

    // =========================================================================
      // LOCAL LOGIN =============================================================
      // =========================================================================
      passport.use('local-login', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, email, password, done) {
          if (email)
              email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

          // asynchronous
          process.nextTick(function() {
              models.Leerkracht.findOne({ 'email' :  email }, function(err, leerkracht) {
                  // if there are any errors, return the error
                  if (err)
                      return done(err);

                  // if no user is found, return the message
                  if (!leerkracht)
                      return done(null, { error: 'No user found. ' });

                  if (!leerkracht.validPassword(password))
                      return done(null, { error: 'Oops! Wrong password.' });

                  // all is well, return user
                  else
                      return done(null, leerkracht);
              });
          });
      }));

      // =========================================================================
      // LOCAL SIGNUP =============================================================
      // =========================================================================
      passport.use('local-signup', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, email, password, done) {
          if (email)
              email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

          // asynchronous
          process.nextTick(function() {
              // if the user is not already logged in:
              if (!req.leerkracht) {
                  models.Leerkracht.findOne({ 'email' :  email }, function(err, leerkracht) {
                      // if there are any errors, return the error
                      if (err)
                          return done(err);

                      console.log(leerkracht);
                      // check to see if theres already a user with that email
                      if (leerkracht) {
                          return done(null, { error: 'That email is already taken.' });
                      } else {

                          // create the user
                          var newlLeerkracht           = new models.Leerkracht();

                          newlLeerkracht.email    = email;
                          newlLeerkracht.password = newlLeerkracht.generateHash(password);
                          newlLeerkracht.firstname=req.body.firstname;
                          newlLeerkracht.lastname=req.body.lastname;

                          newlLeerkracht.save(function(err) {
                              if (err)
                                  throw err;

                              return done(null, newlLeerkracht);
                          });
                      }

                  });
              // if the user is logged in but has no local account...
              }else {
            // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
            return done(null, req.user);
        }


          });

      }));

  };
