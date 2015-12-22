var models = require('../models/leerkracht');
    module.exports = function(app, passport) {


//ADD VRAAG================================================================================
app.post('/addVraag', function(req, res, next) {
  console.log("in /addvraag");
    if (!req.body.vraag||!req.body.soort) {
        return res.json({ error: 'Vul aub vraag in' });
    }

    var now = new Date();
    var curr_year = now.getFullYear();
    var curr_Month = now.getMonth() + 1;
    var curr_date = now.getDate();
    var curr_hour=now.getHours();
    var curr_min=now.getMinutes()+1;
    var todayDate =  (curr_Month + "/" +  curr_date + "/" + curr_year+" "+curr_hour+":"+curr_min);


    var newVraag=new models.Vraag();
    newVraag.vraag=req.body.vraag;
    newVraag.aangemaakt=todayDate;
    newVraag.bewerkt=todayDate;
    newVraag.soort=req.body.soort;
    newVraag.actief=false;

    newVraag.save(function (err){
        if (err) {
          return res.json({ error: 'error saving new vraag' });
             console.log('error saving new vraag');
             console.log(err);
         }
         else {
               console.log('new vraag saved successfully');

               models.Leerkracht.findById(req.user._id, function(err, leerkracht){
                  leerkracht.lessen.id(req.body.lesID).vragen.push(newVraag);


                   leerkracht.save(function (err){
                       if (err) {
                         return res.json({ error: 'error adding new vraag to list' });
                       console.log('error adding new vraag to list');
                       console.log(err);
                       }
                       var les=leerkracht.lessen.id(req.body.lesID);
                       return  res.json(les);

                   });


               });
           };

        });
    });

    //DELETE VRAAG=======================================================================

      //using put not delete because delete doesnt allow req.body parameters
    app.delete('/deleteVraag/:les_id/:vraag_id', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log(req.params.les_id);
            leerkracht.lessen.id(req.params.les_id).vragen.id(req.params.vraag_id).remove();

          leerkracht.save(function (err){
              if (err) {
                return res.json({ error: 'error deleting les from list' });
              console.log('error deleting les from list');
              console.log(err);
              }
                var les=leerkracht.lessen.id(req.params.les_id);
                return  res.json(les);
          });
      });


    });


    //BEWERKVRAAG =============================================
    app.post('/editVraag', function(req, res, next) {

      if (req.body.vraag=="") {
        return res.json({ error: 'Vul aub vraag in' });
    }
    models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          var vraag=leerkracht.lessen.id(req.body.lesID).vragen.id(req.body.vraagID);
          vraag.vraag=req.body.vraag;
          console.log(req.body.vraag);
          leerkracht.save(function (err){
                       if (err) {
                         return res.json({ error: 'error adding new vraag to list' });
                       console.log('error adding new vraag to list');
                       console.log(err);
                       }
                       return  res.json({ success: 'vraag geupdate' });

                   });
          });

    });

    //BEWERKVRAAGSOORT =============================================
    app.post('/editVraagSoort', function(req, res, next) {

      if (!req.body.soort) {
        return res.json({ error: 'Kies aub een soort' });
    }
    models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          var vraag=leerkracht.lessen.id(req.body.lesID).vragen.id(req.body.vraagID);
          vraag.soort=req.body.soort;

          leerkracht.save(function (err){
                       if (err) {
                         return res.json({ error: 'error edditing new soort to list' });
                       console.log('error edditing new soort to list');
                       console.log(err);
                       }
                       return  res.json({ success: 'soort geupdate' });

                   });
          });

    });

    //BEWERKANTOORD =============================================
    app.post('/addOplossing', function(req, res, next) {

      if (!req.body.oplossing) {
        return res.json({ error: 'Vul aub een oplossing in' });
    }

    var newOplossing = new models.Oplossing();
    newOplossing.oplossing = req.body.oplossing;

    newOplossing.save(function (err){
        if (err) {
          return res.json({ error: 'error saving new oplossing' });
             console.log('error saving new oplossing');
             console.log(err);
         }
         else {
               console.log('new oplossing saved successfully');

               models.Leerkracht.findById(req.user._id, function(err, leerkracht){
                 leerkracht.lessen.id(req.body.lesID).vragen.id(req.body.vraagID).oplossingen.push(newOplossing);


                 leerkracht.save(function (err){
                       if (err) {
                         return res.json({ error: 'error adding new oplossing' });
                       console.log('error adding new oplossing');
                       console.log(err);
                       }
                       var vraag = leerkracht.lessen.id(req.body.lesID).vragen.id(req.body.vraagID);
                       return  res.json(vraag);

                   });
          });
        }
    });
  });

    //DELETEOPLOSSING =============================================
    app.put('/deleteOplossing', function(req, res, next) {
      console.log('in /deleteOplossing')
    models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          leerkracht.lessen.id(req.body.lesID).vragen.id(req.body.vraagID).oplossingen.id(req.body.oplossingID).remove();


          leerkracht.save(function (err){
                       if (err) {
                         return res.json({ error: 'error deleting oplossing' });
                       console.log('error deleting oplossing');
                       console.log(err);
                       }
                       var vraag = leerkracht.lessen.id(req.body.lesID).vragen.id(req.body.vraagID);
                       return  res.json(vraag);

                   });
          });

    });

    //ADD MEDIA =============================================
    app.post('/addMedia', function(req, res, next) {

      if (!req.body.media) {
        return res.json({ error: 'Vul aub een link in' });
    }
    models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          var vraag=leerkracht.lessen.id(req.body.lesID).vragen.id(req.body.vraagID);
          if(req.body.soort=="video"){
            vraag.video=req.body.media;
            vraag.afbeelding=null;
          }
          if(req.body.soort=="afbeelding"){
            vraag.afbeelding=req.body.media;
            vraag.video=null;
          }
          console.log(req.body.soort);
          leerkracht.save(function (err){
                       if (err) {
                         return res.json({ error: 'error adding new media to list' });
                       console.log('error adding new media to list');
                       console.log(err);
                       }
                       return  res.json({ success: 'vraag geupdate' });

                   });
          });

    });

  };
