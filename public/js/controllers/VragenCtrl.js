angular.module('VragenCtrl', []).controller('VragenController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope,$routeParams, $location) {
        $scope.lesID = $routeParams.lesID;
        console.log($scope.lesID);
      $scope.vraagID = $routeParams.vraagID;
        console.log($scope.vraagID);

        $http.get('/api/LessenData/' + $scope.lesID)
            .success(function(data) {
                $scope.les = data; //Expose the user data to your angular scope
                $scope.newLes=$scope.les.naam;
            });

        $scope.addVraag=function() {
            var e = document.getElementById("VraagSoort");
          var soortValue = e.options[e.selectedIndex].value;
                  $http.post('/addVraag', {
                          lesID: $scope.lesID,
                          vraag:this.vraag,
                          soort: soortValue
                      })
                      .success(function(data) {
                        $scope.vraag =null; // clear the form so our user is ready to enter another
                        $scope.les = data;
                      });
              };


                $scope.giveID=function(id){
                  $scope.vraagID=id;
                }
                //DELETELES
                      $scope.customButtonDelete={
                        danger: {
                        label: "Delete",
                        className: "btn-danger",
                        callback: function() {
                          $http.delete('/deleteVraag/' + $scope.lesID +'/' +  $scope.vraagID, {
                          })
                              .success(function(data) {
                                  $scope.les = data;
                              })
                              .error(function(data) {
                                  console.log('Error: ' + data);
                              });
                         }
                        },
                        main: {
                        label: "Cancel",
                        className: "btn-default",
                        callback: function() {}
                      }
                    };

                $scope.bewerkVraag=function(vraagID){
                   $location.path( '/BewerkVragen/'+ $scope.lesID +'/'+vraagID);
                };


                $scope.editLes=function(){
                  $http.post('/editLes',{
                    lesnaam:this.newLes, //this komt van html pagina
                    lesID:$scope.lesID

                  })
                  .success(function(data) {
                      $scope.les = data; //Expose the user data to your angular scope
                  });
                };

document.body.style.background = "#D8D8D8 url('../img/Achtergrond.png') no-repeat right top"

}]);
