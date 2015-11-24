// public/js/services/LeerkrachtService.js
angular.module('LeerkrachtService', []).factory('Leerkracht', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/leerkrachten');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/leerkrachten', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/leerkrachten/' + id);
        }
    }

}]);
