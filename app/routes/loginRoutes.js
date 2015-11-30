var models = require('../models/leerkracht');
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

  
    };
