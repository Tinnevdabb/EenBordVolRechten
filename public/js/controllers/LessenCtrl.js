var appLessen = angular.module('LessenCtrl', []);

appLessen.controller('LessenController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

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
                    }

}]);
