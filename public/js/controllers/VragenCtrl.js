angular.module('VragenCtrl', []).controller('VragenController', ['$http', '$scope', '$routeParams', function($http, $scope,$routeParams) {
        $http.get('/api/LessenData')
            .success(function(data) {
                $scope.les = data; //Expose the user data to your angular scope
            });

}]);
