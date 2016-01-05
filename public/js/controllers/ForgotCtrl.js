angular.module('ForgotCtrl', []).controller('ForgotController', ['$http', '$scope', '$routeParams', function($http, $scope,$routeParams) {

  $scope.forgot = function() {
            $http.post('/Forgot', {
                    email: this.email,
                })
                .success(function(data) {
                    console.log(data);
                });
        }
  document.body.style.background = "#D8D8D8 url('../img/Achtergrond.png') no-repeat right top"
}]);
