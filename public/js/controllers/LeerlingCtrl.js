angular.module('LeerlingCtrl', []).controller('LeerlingController', function($scope) {

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


});
