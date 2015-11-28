angular.module('VragenCtrl', []).controller('VragenController', ['$http', '$scope', '$routeParams', function($http, $scope,$routeParams) {
        $scope.vraagID = $routeParams.vraagID;

        $http.get('/api/LessenData/' + $scope.vraagID)
            .success(function(data) {
                $scope.les = data; //Expose the user data to your angular scope
            });

}]);
