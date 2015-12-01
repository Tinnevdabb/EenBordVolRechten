// public/js/controllers/LeerkrachtCtrl.js


angular.module('LeerkrachtCtrl', []).controller('LeerkrachtController', ['$http',"$rootScope", '$scope', function($http, $rootScope, $scope) {
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

        document.body.style.background = 'blue';     



}]);
