angular.module('LeerlingPresentatieOpenCtrl', []).controller('LeerlingPresentatieOpenController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
$scope.addAntwoord=function(){
  $http.post('/addAntwoord',{
    antwoord:this.antwoord,
    vraagID:$scope.vraag._id
  });
};
document.body.style.background = "#F4FA58 "
}]);
