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

        document.body.style.background = "#f3f3f3 url('../img/Achtergrond.png') no-repeat right top"



}]);
