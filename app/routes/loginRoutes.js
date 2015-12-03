var models = require('../models/leerkracht');
    module.exports = function(app, passport) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // LOGOUT LEERKRACHT==============================
        app.post('/logout', function(req, res) {
          req.session.destroy(function (err) {
                res.json({ redirect: '/logout' });
               });

        });


        // show the login form


        // LOGIN lEERKRACHT===============================

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

          // SIGNUP LEERKRACHT=================================

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

    // LOGOUT LEERLING==============================
    app.post('/logoutLeerling', function(req, res) {

        //code om sessie leerling te stoppen


      res.json({ redirect: '/' });
    });


    // LOGIN lEERLING===============================


    app.post('/InlogLeerling', function(req, res, next) {

            /*var leerkrachtID= models.Lessen.find({token:req.body.token}).leerkrachtID;
              var lesID=models.Lessen.find({token:req.body.token})._id;
             models.Leerkracht.findById(req.user._id, function(err, leerkracht){


             i(actief==true){
             var les=leerkracht.lessen.id(req.body.lesID);
             return  res.json(les);
           }else{
             return res.json({ error: 'les nog niet actief' });
         }
             */
            //code om sessie leerling te starten
            res.cookie("name: ",req.body.voornaam+req.body.achternaam);

            res.json({ redirect: '/LeerlingPresentatie' });



      });


    };
