angular.module('SignupCtrl', []).controller('SignupController', ['$http', '$scope', function($http, $scope) {

  $scope.signup = function() {
              console.log("Boom");
              $http
                  .post('/signup', {
                      email: this.email,
                      password: this.password,
                      firstname: this.firstname,
                      lastname: this.lastname
                  })
                  .success(function(data) {
                      console.log(data);
                  });
          }
          document.body.style.background = "#D8D8D8 url('../img/Achtergrond.png') no-repeat right top"

      }]);
