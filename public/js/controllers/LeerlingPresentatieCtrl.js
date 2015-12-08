angular.module('LeerlingPresentatieCtrl', []).controller('LeerlingPresentatieController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {

  $scope.lesID = $routeParams.lesID;
  $http.get('/api/LessenData/' + $scope.lesID)
      .success(function(data) {
          $scope.les = data; //Expose the user data to your angular scope
      });

      $http.get('/leerlingdata')
          .success(function(data) {
              $scope.leerling = data; //Expose the user data to your angular scope
              console.log($scope.leerling);
          });


      $scope.templates =
   [ { name: 'open', url: 'views/LeerlingPresentatie/LeerlingPresentatieOpen.html'},
   { name: 'cloud', url: 'views/LeerlingPresentatie/LeerlingPresentatieCloud.html'},
     { name: 'multi', url: 'views/LeerlingPresentatie/LeerlingPresentatieMulti.html'} ];
      $scope.template = $scope.templates[1];


      document.body.style.background = "#F4FA58 url('../img/Logo.png') no-repeat right top"

      }]);
