var appLessen = angular.module('LessenCtrl', []);

appLessen.controller('LessenController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Profile functionality
            $http.get('/api/leerkrachtData')
                .success(function(data) {
                    $scope.leerkracht = data; //Expose the user data to your angular scope
                });

                $scope.lessen = [
                                            { Naam: "les 1 tryout", Aangemaakt: "07/02/2015", Bewerkt: "13/02/2015" },
                                            {  Naam: "les 2 tryout", Aangemaakt: "10/02/2015", Bewerkt: "17/02/2015" },
                                            {  Naam: "les 3 tryout", Aangemaakt: "23/02/2015", Bewerkt: "28/02/2015" },
                                            { Naam: "les 4 tryout", Aangemaakt: "27/02/2015", Bewerkt: "13/03/2015" },
                            ];

              $scope.addLes = function () {
                      $scope.lessen.push({ 'Naam': $scope.naam, 'Aangemaakt': $scope.aangemaakt, 'Bewerkt': $scope.bewerkt });
                      $scope.naam = '';
                      $scope.aangemaakt = '';
                      $scope.bewerkt = '';
                  };

}]);
