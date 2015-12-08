angular.module('LeerkrachtPresentatieMultiCtrl', []).controller('LeerkrachtPresentatieMultiController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  document.body.style.background = "#CEF6F5 url"


  $scope.getAnswers=function(){
    $http.get('/api/AntwoordData/' + $scope.lesID +'/' + $scope.vraag._id)
        .success(function(data) {
              $scope.antwoorden = data;
            console.log($scope.antwoorden);
        });
      };


}]);
