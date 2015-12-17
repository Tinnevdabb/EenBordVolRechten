angular.module('LeerlingPresentatieCloudCtrl', []).controller('LeerlingPresentatieCloudController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  $scope.addAntwoord=function(){
    $http
        .post('/addAntwoord',{
          antwoord:this.antwoord,
          vraagID:$scope.vraag._id
            })
        .success(function(data) {
            $scope.antwoord =null;
          });

  };
document.body.style.background = "#F4FA58"

}]);
