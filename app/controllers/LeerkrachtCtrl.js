var Leerkracht = require('mongoose').model('Leerkracht');

exports.create = function(req, res, next) {
    var leerkracht = new Leerkracht(req.body);
    leerkracht.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(leerkracht);
        }
    });
};

/*var mongoose   = require('mongoose');
var    Leerkracht=mongoose.model('Leerkracht');
    // create a new user
    var newUser = Leerkracht({
      username: 'TimD',
     firstname : 'Tim',
     lastname : 'Dams',
     email : 'Dams@ap.be',
     password: 'TD123',
    });

    // save the user
    newUser.save(function(err) {
      if (err) throw err;

      console.log('User created!');
    });*/
