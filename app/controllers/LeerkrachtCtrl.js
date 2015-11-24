// public/js/controllers/LeerkrachtCtrl.js
var mongoose   = require('mongoose');
var    Leerkracht=mongoose.model('Leerkracht');

angular.module('LeerkrachtCtrl', []).controller('LeerkrachtController', function($scope) {

    $scope.tagline = 'Nothing beats a pocket protector!';


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
    });

});
