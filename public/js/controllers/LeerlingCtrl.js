angular.module('LeerlingCtrl', []).controller('LeerlingController',  ['$http',"$rootScope", '$scope', function($http, $rootScope, $scope) {

  $scope.InlogLeerling = function() {
            $http
                .post('/InlogLeerling', {
                    voornaam: this.voornaam,
                    achternaam: this.achternaam,
                    token: this.token
                })
                .success(function(data) {
                    console.log(data);
                });
        }

document.body.style.background = "#aff59c url('../img/Logo.png') no-repeat right top"
}]);
