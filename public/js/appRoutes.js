// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the LeerkrachtController
        .when('/leerkrachten', {
            templateUrl: 'views/InlogLeerkracht.html',
            controller: 'LeerkrachtController'
        });

    $locationProvider.html5Mode(true);

}]);
