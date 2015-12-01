angular.module('LeerkrachtPresentatieCtrl', []).controller('LeerkrachtPresentatieController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {

  $scope.lesID = $routeParams.lesID;
  $http.get('/api/LessenData/' + $scope.lesID)
      .success(function(data) {
          $scope.les = data; //Expose the user data to your angular scope
      });


      $scope.templates =
   [ { name: 'open', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieOpen.html'},
     { name: 'multi', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieOMulti.html'} ];
      $scope.template = $scope.templates[0];

      $scope.stopLes=function(id){
         $location.path( '/BeheerLessen' );
      };


}]);
