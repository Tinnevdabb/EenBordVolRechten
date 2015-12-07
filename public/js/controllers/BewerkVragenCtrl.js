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
          if($scope.vraag.soort=="meerkeuze"){
            $scope.multi=true;
            console.log("meerkeuze");
          }

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

        $scope.editVraagSoort=function() {
            var e = document.getElementById("VraagSoort");
          var soortValue = e.options[e.selectedIndex].value;
          console.log(soortValue);
                  $http.post('/editVraagSoort', {
                          lesID: $scope.lesID,
                          vraagID:$scope.vraagID,
                          soort: soortValue

                      })
                      .success(function(data) {
                        $scope.vraag = data;
                      });
              };










document.body.style.background = "#CEF6F5 url('../img/Achtergrond.png') no-repeat right top"
}]);
