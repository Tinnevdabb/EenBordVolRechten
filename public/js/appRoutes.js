// public/js/appRoutes.js
  angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.ejs',
            controller: 'MainController'
        })

        // nerds page that will use the LeerkrachtController
        .when('/InlogLeerkracht', {
            templateUrl: 'views/InlogLeerkracht.ejs',
            controller: 'LeerkrachtController'
        })

        .when('/SignUp', {
            templateUrl: 'views/SignUp.ejs',
            controller: 'SignupController'
        })

        .when('/InlogLeerling', {
            templateUrl: 'views/InlogLeerling.ejs',
            controller: 'LeerlingController'
        })

        .when('/BeheerLessen', {
            templateUrl: 'views/BeheerLessen.ejs',
            controller: 'LessenController'
        });

    $locationProvider.html5Mode(true);

}]);
