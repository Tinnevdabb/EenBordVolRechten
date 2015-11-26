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


        /*app.post('/SignUp', function (req, res, next) {
            var leerkracht = new Leerkracht({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email : req.body.email,
              password: req.body.password,
            })
            leerkracht.save(function (err, leerkracht) {
              if (err) { return next(err) }
              //res.json(201, leerkracht)
              res.redirect('InlogLeerkracht')
            })

          })*/

          // process the signup form
          app.post('/signup', passport.authenticate('local-signup', {
              successRedirect : '/InlogLeerkracht', // redirect to the secure profile section
              failureRedirect : '/signup', // redirect back to the signup page if there is an error
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
