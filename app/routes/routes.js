// app/routes.js
// grab the leerkracht model we just created
var models = require('../models/leerkracht');
    module.exports = function(app, passport) {



      //OPEN LES =====================================================

      app.get('/api/LessenData/:les_id', isLoggedInAjax, function(req, res) {

          models.Leerkracht.findById(req.user._id, function(err, leerkracht){
                var les=leerkracht.lessen.id(req.params.les_id);

                console.log(req.user);
              return res.json(les);


                });
          });



      //PROTECT PAGES AND DATA ===============================================================
          app.get('/BeheerLessen',isLoggedIn);
          app.get('/BeheerVragen',isLoggedIn);

          app.get('/api/leerkrachtData', isLoggedInAjax, function(req, res) {
              console.log(req.user);
            return res.json(req.user);
        });

        app.get('/api/lessenData', isLoggedInAjax, function(req, res) {
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
