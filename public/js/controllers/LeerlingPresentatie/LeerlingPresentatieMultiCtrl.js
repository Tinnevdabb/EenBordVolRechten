angular.module('LeerlingPresentatieMultiCtrl', []).controller('LeerlingPresentatieMultiController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  $scope.addAntwoord=function(){

     $http.post('/addAntwoord',{
      antwoord:$scope.antwoord,
      vraagID:$scope.vraag._id
    });
  };
document.body.style.background = "#F4FA58 "
}]);
