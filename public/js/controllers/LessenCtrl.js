var appLessen = angular.module('LessenCtrl', ['ngRoute']);
appLessen.constant("lessen", [
                            { Naam: "les 1 tryout", Aangemaakt: "07/02/2015", Bewerkt: "13/02/2015" },
                            {  Naam: "les 2 tryout", Aangemaakt: "10/02/2015", Bewerkt: "17/02/2015" },
                            {  Naam: "les 3 tryout", Aangemaakt: "23/02/2015", Bewerkt: "28/02/2015" },
                            { Naam: "les 4 tryout", Aangemaakt: "27/02/2015", Bewerkt: "13/03/2015" },
            ]);
appLessen.controller('LessenController', ['$scope','lessen', function ($scope,lessen) {
 $scope.lessen = lessen;
}]);
