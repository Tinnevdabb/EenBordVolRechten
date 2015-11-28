// app/routes.js
// grab the leerkracht model we just created
var models = require('./models/leerkracht');
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

      var now = new Date();
      var curr_year = now.getFullYear();
      var curr_Month = now.getMonth() + 1;
      var curr_date = now.getDate();
      var curr_hour=now.getHours();
      var curr_min=now.getMinutes()+1;
      var todayDate =  (curr_Month + "/" +  curr_date + "/" + curr_year+" "+curr_hour+":"+curr_min);

      var newLes=new models.Les();
      newLes.naam=req.body.naam;
      newLes.aangemaakt=todayDate;
      newLes.bewerkt=todayDate;

      newLes.save(function (err){
          if (err) {
               console.log('error saving new task');
               console.log(err);
           }
           else {
                 console.log('new task saved successfully');

                 models.Leerkracht.findById(req.user._id, function(err, leerkracht){

                     leerkracht.lessen.push(newLes);

                     leerkracht.save(function (err){
                         if (err) {
                         console.log('error adding new task to list');
                         console.log(err);
                         }
                     });
                 });
             };
          });



      });



    app.get('/api/leerkrachtData', isLoggedInAjax, function(req, res) {
        console.log(req.user);
      return res.json(req.user);
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
