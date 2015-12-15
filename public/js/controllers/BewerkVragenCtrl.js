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


              $scope.addOplossing = function(oplossing) {

                $http.post('/addOplossing/', {
                  lesID:$scope.lesID,
                  vraagID:$scope.vraagID,
                  oplossing:this.Oplossing

                })
                    .success(function(data) {
                        $scope.vraag = data;
                        $scope.Oplossing = null;

                    })

                  };



            $scope.deleteOplossing = function(oplID) {
            var answer= confirm("Are you sure you want to delete an answer?");
            if (answer){
                $http.put('/deleteOplossing/', {
                lesID:$scope.lesID,
                vraagID:$scope.vraagID,
                oplossingID:oplID

              })
                  .success(function(data) {
                      $scope.vraag = data;
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                  });}
                  else {
                    alert("you chose not to delete the answer");
                  }
                };










document.body.style.background = "#D8D8D8 url('../img/Achtergrond.png') no-repeat right top"
}]);
