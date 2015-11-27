// app/routes.js
// grab the leerkracht model we just created
var Leerkracht = require('./models/leerkracht');


    module.exports = function(app, passport) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // LOGOUT ==============================
        app.post('/logout', function(req, res) {
          req.logout();
          res.json({ redirect: '/logout' });
        });


        // show the login form


        // LOGIN ===============================

        // process the login form
        app.post('/InlogLeerkracht', function(req, res, next) {
            if (!req.body.email || !req.body.password) {
                return res.json({ error: 'Email and Password required' });
            }
            passport.authenticate('local-login', function(err, leerkracht, info) {
                if (err) {
                    return res.json(err);
                }
                if (leerkracht.error) {
                    return res.json({ error: leerkracht.error });
                }
                req.logIn(leerkracht, function(err) {
                    if (err) {
                        return res.json(err);
                    }
                    return res.json({ redirect: '/BeheerLessen' });
                });
            })(req, res);
          });

          // SIGNUP =================================

		// process the signup form
		app.post('/SignUp', function(req, res, next) {
		    if (!req.body.email || !req.body.password || !req.body.firstname|| !req.body.lastname) {
		        return res.json({ error: 'Vul aub alle velden in' });
		    }
		    passport.authenticate('local-signup', function(err, leerkracht, info) {
		        if (err) {
		            return res.json(err);
		        }
		        if (leerkracht.error) {
		            return res.json({ error: leerkracht.error });
		        }
		        req.logIn(leerkracht, function(err) {
		            if (err) {
		                return res.json(err);
		            }
		            return res.json({ redirect: '/BeheerLessen' });
		        });
		    })(req, res);
		});

  // ADD LES =================================
  app.post('/addLes', function(req, res, next) {
      if (!req.body.naam) {
          return res.json({ error: 'Vul aub een les naam in' });
      }

          Leerkracht.findById(req.user._id, function(err, leerkracht) {
          // if there are any errors, return the error
          if (err)
              return done(err);

              // create the user

               var now = new Date();
              /*  var newLes           = new Les();
              newLes.naam    = req.body.naam;
              newLes.aangemaakt = now;
              newLes.bewerkt=now;*/
              console.log(leerkracht.lessen);

              leerkracht.lessen.push({ naam: req.body.naam,aangemaakt:now, bewerkt:now });
              leerkracht.save(function(err, saved) {
                 if(err) console.error(err);
             });
        });
      });



    app.get('/api/leerkrachtData', isLoggedInAjax, function(req, res) {
        console.log(req.user);
      return res.json(req.user);
  });






        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };

    // route middleware to ensure user is logged in - ajax get
    function isLoggedInAjax(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.json( { redirect: '/' } );
        } else {
            next();
        }
    }

    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
