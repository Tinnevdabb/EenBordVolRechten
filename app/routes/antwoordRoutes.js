var models = require('../models/leerkracht');
    module.exports = function(app, passport) {

      //ADD ANTWOORD =======================================================================
      app.post('/addAntwoord', function(req, res, next) {
        console.log('in antwoord');
          if (!req.body.antwoord) {
              return res.json({ error: 'Vul aub antwoord in' });
          }
        /*  models.Leerkracht.findById(req.session.leerkrachtID,function(err,leerkracht)
          {
            if(!leerkracht.lessen.id(req.session.lesID).vragen.id(req.body.vraagID).actief)
            {
              return res.json({ error: 'vraag is niet actief' });
          }
        });*/


          var newAntwoord=new models.Antwoord();
          newAntwoord.antwoord=req.body.antwoord;
          newAntwoord.voornaam=req.session.voornaam;
          newAntwoord.achternaam=req.session.achternaam;

          newAntwoord.save(function (err){
              if (err) {console.log(err);
                return res.json({ error: 'error saving new antwoord' });
                   console.log('error saving new antwoord');
                   console.log(err);
               }
               else {
                     console.log('new vraag saved successfully');

                     models.Leerkracht.findById(req.session.leerkrachtID, function(err, leerkracht){
                        leerkracht.lessen.id(req.session.lesID).vragen.id(req.body.vraagID).antwoorden.push(newAntwoord);
                         leerkracht.save(function (err){
                             if (err) {
                               return res.json({ error: 'error adding new answer to list' });
                             console.log('error adding new answer to list');
                             console.log(err);
                             }
                         });
                     });
                 };
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



    };
    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
