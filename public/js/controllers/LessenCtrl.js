var appLessen = angular.module('LessenCtrl', []);

appLessen.controller('LessenController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location) {

            $http.get('/api/leerkrachtData')
                .success(function(data) {
                    $scope.leerkracht = data; //Expose the user data to your angular scope
                });



              $scope.addLes = function() {
                        $http.post('/addLes', {
                                naam: this.naam
                            })
                            .success(function(data) {
                              $scope.naam =""; // clear the form so our user is ready to enter another
                              $scope.leerkracht = data;
                            });
                    };


              $scope.deleteLes = function(id) {
              $http.delete('/deleteLes/' + id)
                  .success(function(data) {
                      $scope.leerkracht = data;
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                  });
                };

             $scope.bewerkLes=function(id){
                $location.path( '/BeheerVragen/'+ id );
             };

             $scope.startLes=function(id){
                $location.path( '/LeerkrachtPresentatie/'+ id );
             };


}]);
