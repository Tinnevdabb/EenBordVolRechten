// app/routes.js
// grab the leerkracht model we just created
var models = require('../models/leerkracht');
    module.exports = function(app, passport) {



      //OPEN LES =====================================================

      app.get('/api/LessenData/:les_id', isLoggedIn, function(req, res) {

          models.Leerkracht.findById(req.user._id, function(err, leerkracht){
                var les=leerkracht.lessen.id(req.params.les_id);

              return res.json(les);


                });
          });

                app.get('/api/LessenDataLeerling/:les_id', function(req, res) {

                    models.Leerkracht.findById(req.session.leerkrachtID, function(err, leerkracht){
                          var les=leerkracht.lessen.id(req.params.les_id);

                        return res.json(les);


                          });
                    });
          //OPEN LES =====================================================

          app.get('/leerlingdata', function(req, res) {


                  return res.json(req.session);

              });


              //GET LEERKRACHT NAAM=====================================================

              app.get('/api/leerkrachtNaam', function(req, res) {

                  console.log(req.user.firstname);
                      return res.json(req.user.firstname);

                  });



          //OPEN VRAAG =====================================================

                   app.get('/api/LessenData/:les_id/:vraag_id', isLoggedIn, function(req, res) {

                       models.Leerkracht.findById(req.user._id, function(err, leerkracht){
                             var vraag=leerkracht.lessen.id(req.params.les_id).vragen.id(req.params.vraag_id);


                             console.log(req.user);
                           return res.json(vraag);


                             });
                       });

                       //GET ANTWOORDEN ================================================

                           app.get('/api/AntwoordData/:les_id/:vraag_id', isLoggedIn, function(req, res) {

                                 models.Leerkracht.findById(req.user._id, function(err, leerkracht){
                                        var vraag=leerkracht.lessen.id(req.params.les_id).vragen.id(req.params.vraag_id);
                                         console.log("getting antwoord data")

                                         return res.json(vraag.antwoorden);


                                       });
                               });



      //PROTECT PAGES AND DATA ===============================================================
          app.get('/BeheerLessen',isLoggedIn);
          app.get('/BeheerVragen',isLoggedIn);
          app.get('/BeheerVragen/:lesID',isLoggedIn);
          app.get('/LeerkrachtPresentatie/:lesID',isLoggedIn);
          app.get('/BewerkVragen/:lesID/:vraagID',isLoggedIn);
          app.get('/LeerlingPresentatie/:lesID',isLoggedInLeerling);

          app.get('/LeerlingPresentatie');

          app.get('/api/leerkrachtData', isLoggedIn, function(req, res) {
              console.log(req.user);
            return res.json(req.user);
        });

        app.get('/api/lessenData', isLoggedIn, function(req, res) {
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


    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a user is logged in
function isLoggedInLeerling(req, res, next) {

// if user is authenticated in the session, carry on
if (req.session.voornaam)
    return next();

// if they aren't redirect them to the home page
res.redirect('/');
}
