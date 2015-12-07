angular.module('BewerkVragenCtrl', []).controller('BewerkVragenController', ['$http', '$scope', '$routeParams', function($http, $scope,$routeParams) {
  $scope.lesID = $routeParams.lesID;
  console.log($scope.lesID);

  $http.get('/api/LessenData/' + $scope.lesID)
      .success(function(data) {
          $scope.les = data; //Expose the user data to your angular scope
      });




document.body.style.background = "#CEF6F5 url('../img/Achtergrond.png') no-repeat right top"
}]);
