// public/js/appRoutes.js
  angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the LeerkrachtController
        .when('/InlogLeerkracht', {
            templateUrl: 'views/InlogLeerkracht.html',
            controller: 'LeerkrachtController'
        })

        .when('/SignUp', {
            templateUrl: 'views/SignUp.html',
            controller: 'SignupController'
        })
        .when('/Forgot', {
            templateUrl: 'views/Forgot.html',
            controller: 'ForgotController'
        })
        .when('/Reset/:token', {
            templateUrl: 'views/Reset.html',
            controller: 'ResetController'
        })

        .when('/InlogLeerling', {
            templateUrl: 'views/InlogLeerling.html',
            controller: 'LeerlingController'
        })

        .when('/BeheerLessen', {
            templateUrl: 'views/BeheerLessen.html',
            controller: 'LessenController'
        })
        .when('/BeheerVragen/:lesID', {
            templateUrl: 'views/BeheerVragen.html',
            controller: 'VragenController'
        })
        .when('/BewerkVragen/:lesID/:vraagID', {
            templateUrl: 'views/BewerkVragen.html',
            controller: 'BewerkVragenController'
        })
        .when('/LeerkrachtPresentatie/:lesID', {
            templateUrl: 'views/LeerkrachtPresentatie.html',
            controller: 'LeerkrachtPresentatieController'
        })
        .when('/LeerlingPresentatie/:lesID', {
            templateUrl: 'views/LeerlingPresentatie.html',
            controller: 'LeerlingPresentatieController'
        })
        .otherwise({
                    templateUrl: '/views/home.html',
                    controller: 'MainController',

                });

    $locationProvider.html5Mode(true);

}]);
