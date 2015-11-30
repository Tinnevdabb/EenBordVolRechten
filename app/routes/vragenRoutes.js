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
    var curr_hour=now.getHours()+1;
    var curr_min=now.getMinutes()+1;
    var todayDate =  (curr_Month + "/" +  curr_date + "/" + curr_year+" "+curr_hour+":"+curr_min);

    var newVraag=new models.Vraag();
    newVraag.vraag=req.body.vraag;
    newVraag.aangemaakt=todayDate;
    newVraag.bewerkt=todayDate;
    newVraag.soort=req.body.soort;

    newVraag.save(function (err){
        if (err) {
             console.log('error saving new vraag');
             console.log(err);
         }
         else {
               console.log('new vraag saved successfully');

               models.Leerkracht.findById(req.user._id, function(err, leerkracht){
                  leerkracht.lessen.id(req.body.lesID).vragen.push(newVraag);


                   leerkracht.save(function (err){
                       if (err) {
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
  };
