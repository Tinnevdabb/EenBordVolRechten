angular.module('LeerkrachtPresentatieCloudCtrl', []).controller('LeerkrachtPresentatieCloudController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
 $scope.words = [];

 //generates number between 5 and 15
 $scope.getRandomSpan = function(){
         return Math.floor((Math.random()*13)+1);
       }

      $scope.vraagID=$scope.vraag._id;
      console.log($scope.vraagID);

      $scope.getAnswers=function(){
        $http.get('/api/antwoordData/' + $scope.lesID +'/' + $scope.vraag._id)
            .success(function(data) {
                  $scope.antwoorden = data;

                $scope.words = [];
                angular.forEach($scope.antwoorden, function(value, key) {

                $scope.words.push({
                          text: value.antwoord,
                          weight: $scope.getRandomSpan()
                      });
              });
              console.log($scope.words);
            });
          };


      document.body.style.background = "#CEF6F5 url"

}]);
