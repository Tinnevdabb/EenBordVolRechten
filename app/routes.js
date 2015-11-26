// app/routes.js
// grab the leerkracht model we just created
var Leerkracht = require('./models/leerkracht');

    module.exports = function(app, passport) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/leerkrachten', function(req, res) {
            // use mongoose to get all leerkrachten in the database
            leerkrachten.find(function(err, leerkrachten) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(leerkrachten); // return all nerds in JSON format
            });
        });

        app.get('/BeheerLessen', isLoggedIn);

        app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

        // show the login form


          // process the signup form
          app.post('/SignUp', passport.authenticate('local-signup', {
              successRedirect : '/BeheerLessen', // redirect to the secure profile section
              failureRedirect : '/SignUp', // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
          }));

          // process the login form
          app.post('/InlogLeerkracht', passport.authenticate('local-login', {
              successRedirect : '/BeheerLessen', // redirect to the secure profile section
              failureRedirect : '/InlogLeerkracht', // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
          }));



        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };

    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
