angular.module('VragenCtrl', []).controller('VragenController', ['$http', '$scope', '$routeParams', function($http, $scope,$routeParams) {
        $scope.lesID = $routeParams.lesID;

        $http.get('/api/LessenData/' + $scope.lesID)
            .success(function(data) {
                $scope.les = data; //Expose the user data to your angular scope
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
                        $scope.vraag =""; // clear the form so our user is ready to enter another
                        $scope.les = data;
                      });
              };

              $scope.deleteVraag = function(id) {
              $http.put('/deleteVraag/' + id, {
                      lesID: $scope.lesID,
                  })
                  .success(function(data) {
                      $scope.les = data;
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                  });
                };

}]);
