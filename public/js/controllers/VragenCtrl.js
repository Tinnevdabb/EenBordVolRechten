angular.module('VragenCtrl', []).controller('VragenController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope,$routeParams, $location) {
        $scope.lesID = $routeParams.lesID;
        console.log($scope.lesID);

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

              //using put not delete because delete doesnt allow req.body parameters
              $scope.deleteVraag = function(id) {
                var answer= confirm("Are you sure you want to delete that question?");
                if (answer){
              $http.put('/deleteVraag/' + id, {
                      lesID: $scope.lesID,
                  })
                  .success(function(data) {
                      $scope.les = data;
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                  });}
                  else {
                    alert("you chose not to delete the question");
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

document.body.style.background = "#CEF6F5 url('../img/Achtergrond.png') no-repeat right top"

}]);
