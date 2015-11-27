// public/js/controllers/LeerkrachtCtrl.js


angular.module('LeerkrachtCtrl', []).controller('LeerkrachtController', ['$http', '$scope', function($http, $scope) {
  $scope.login = function() {
            $http
                .post('/InlogLeerkracht', {
                    email: this.email,
                    password: this.password
                })
                .success(function(data) {
                    console.log(data);
                });
        }


}]);
