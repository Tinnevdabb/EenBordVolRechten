angular.module('LeerkrachtPresentatieMultiCtrl', []).controller('LeerkrachtPresentatieMultiController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  document.body.style.background = "#D8D8D8"

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
                    console.log(oplossing.oplossing+":"+value.antwoord);
                        if(oplossing.oplossing==value.antwoord){
                          console.log("+1");
                           amount = amount+1;
                          console.log(amount);
                        }
                    });

                    $scope.results.push({
                      opl: oplossing.oplossing,
                      aantal:amount
                  });
                  amount=0;
                  console.log($scope.results);
          });



        });
      };

      //check of er video of image is
      if($scope.vragen.video==null)
      {
        $scope.video=true;
        $scope.afbeelding=false;
      }else if($scope.vragen.afbeelding==null){
        $scope.video=false;
        $scope.afbeelding=true;
      }else{
        $scope.video=false;
        $scope.afbeelding=false;
      }



}]);
