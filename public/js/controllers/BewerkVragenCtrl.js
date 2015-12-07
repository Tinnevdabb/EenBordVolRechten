angular.module('BewerkVragenCtrl', []).controller('BewerkVragenController', ['$http', '$scope', '$routeParams', function($http, $scope,$routeParams) {
  $scope.lesID = $routeParams.lesID;
  console.log($scope.lesID);
  $scope.vraagID = $routeParams.vraagID;
  console.log($scope.vraagID);
  $scope.mutli=false;


  $http.get('/api/LessenData/' + $scope.lesID +'/' + $scope.vraagID )
      .success(function(data) {
          $scope.vraag = data; //Expose the user data to your angular scope
          console.log($scope.vraag.vraag);
          $scope.newVraag=$scope.vraag.vraag;

      });

        $scope.editVraag=function(){
          $http.post('/editVraag',{
            vraag:this.newVraag, //this komt van html pagina
            lesID:$scope.lesID,
            vraagID:$scope.vraagID
          })
          .success(function(data) {
              $scope.vraag = data; //Expose the user data to your angular scope
          });
        };


              if($scope.multi=true){
                console.log("meerkeuze");

              }else{}







document.body.style.background = "#CEF6F5 url('../img/Achtergrond.png') no-repeat right top"
}]);
