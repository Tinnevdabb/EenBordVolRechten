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


    // LOGIN lEERLING===============================


    app.post('/InlogLeerling', function(req, res, next) {
          models.Les.findOne({token: req.body.token}, function(err,les)
          {
                if (err)
                {
                  throw(err);
                }
                else if (!les)
                {
                    return res.json({ error: 'Geen les met deze token gevonden' });
                }else{
                      req.session.lesID=les._id;
                      req.session.leerkrachtID=les.leerkrachtID;
                      models.Leerkracht.findById(les.leerkrachtID,function(err,leerkracht)
                      {
                        if(leerkracht.lessen.id(les._id).actief)
                        {
                          req.session.voornaam=req.body.voornaam;
                          req.session.achternaam=req.body.achternaam;
                          res.json({ redirect: '/LeerlingPresentatie/'+les._id });
                        }else{
                          return res.json({ error: 'les nog niet actief' });
                      }
                      });
                }
          });
      });


      //CHANGE PASSWORD==================================================
      app.post('/changePassword', function(req, res, next) {
        if (!req.body.newPassword1 || !req.body.newPassword2) {
            return res.json({ error: 'Vul aub alle velden in' });
        }
        if (req.body.newPassword1 != req.body.newPassword2) {
            return res.json({ error: 'wachtwoorden waren niet identiek' });
        }
        models.Leerkracht.findById(req.user._id,function(err,leerkracht)
        {
          console.log(leerkracht);
          leerkracht.password=leerkracht.generateHash(req.body.newPassword1);
          leerkracht.save(function (err){
                       if (err) {
                         return res.json({ error: 'error changing new password' });

                       }
                       return  res.json({ success: 'password updated' });

                   });
             });
      });

    };
