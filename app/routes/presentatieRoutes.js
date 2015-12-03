var models = require('../models/leerkracht');
    module.exports = function(app, passport) {



    //START PRESENTATION ACTIEF=TRUE ==========================================================================
    app.post('/StartLeerkrachtPresentatie/:les_id', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.params.les_id).actief=true;

          leerkracht.save(function (err){
              if (err) {
                return res.json({ error: 'error deleting les from list' });
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
                return res.json({ error: 'error deleting les from list' });
              console.log('error deleting les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
                res.json({ redirect: '/BeheerLessen'});
          });
      });
    });
};
