angular.module('LeerkrachtPresentatieMultiCtrl', []).controller('LeerkrachtPresentatieMultiController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  document.body.style.background = "#CEF6F5 url"

 $scope.oplossingen=$scope.vraag.oplossingen;
$scope.results = [];
var amount=0;

  $scope.getAnswers=function(){
    $http.get('/api/AntwoordData/' + $scope.lesID +'/' + $scope.vraag._id)
        .success(function(data) {
              $scope.antwoorden = data;

            $scope.results = [];
            angular.forEach($scope.oplossingen, function(oplossing, key) {
                  angular.forEach($scope.antwoorden, function(value, key) {
                    console.log(oplossing+":"+value.antwoord);
                        if(oplossing==value.antwoord){
                          console.log("+1");
                           amount = amount+1;
                          console.log(amount);
                        }
                    });

                    $scope.results.push({
                      opl: oplossing,
                      aantal:amount
                  });
                  console.log($scope.results);
          });



        });
      };


}]);
