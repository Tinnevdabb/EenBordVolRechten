var models = require('../models/leerkracht');
    module.exports = function(app, passport) {



    //START PRESENTATION ACTIEF=TRUE ==========================================================================
    app.post('/StartLeerkrachtPresentatie/:les_id', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.params.les_id).actief=true;

          leerkracht.save(function (err){
              if (err) {
              console.log('error deleting les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
                res.json({ redirect: '/LeerkrachtPresentatie/'+req.params.les_id });
          });
      });
    });

    //STOP PRESENTATION ACTIEF=FALSE ==========================================================================
    app.post('/StopLeerkrachtPresentatie/:les_id', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.params.les_id).actief=false;

          leerkracht.save(function (err){
              if (err) {
              console.log('error deactivating les');
              console.log(err);
              }
              console.log("saved leerkracht ");
                res.json({ redirect: '/BeheerLessen'});
          });
      });
    });

    //PRESENTATION FIRST VRAAG ACTIEF=TRUE ==========================================================================
    app.post('/activateVraag', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.body.les_id).vragen.id(req.body.currentVraag_id).actief=true;

          leerkracht.save(function (err){
              if (err) {
              console.log('error deleting les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
          });
      });
    });

    //PRESENTATION LAST VRAAG ACTIEF=FALSE ==========================================================================
    app.post('/deactivateVraag', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.body.les_id).vragen.id(req.body.currentVraag_id).actief=false;
          leerkracht.save(function (err){
              if (err) {
              console.log('error deleting les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
          });
      });
    });

    //PRESENTATION CHANGE VRAAG ACTIEF=FALSE/TRUE ==========================================================================
    app.post('/changeActiefVraag', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.body.les_id).vragen.id(req.body.currentVraag_id).actief=true;
            leerkracht.lessen.id(req.body.les_id).vragen.id(req.body.previousVraag_id).actief=false;

          leerkracht.save(function (err){
              if (err) {
              console.log('error activating/deactivating les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
          });
      });
    });


};
