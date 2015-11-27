var appLessen = angular.module('LessenCtrl', []);

appLessen.controller('LessenController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

            $http.get('/api/leerkrachtData')
                .success(function(data) {
                    $scope.leerkracht = data; //Expose the user data to your angular scope
                });



              $scope.addLes = function() {
                        $http
                            .post('/addLes', {
                                naam: this.naam,
                                aangemaakt: this.aangemaakt,
                                bewerkt:this.bewerkt
                            })
                            .success(function(data) {
                                console.log(data);
                            });
                    }

}]);
