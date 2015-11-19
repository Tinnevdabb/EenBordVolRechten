var app = angular.module('EenBordVolRechten', ['ui.router']);


app.config([
'$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('Home', {
          url: '/Home',
          templateUrl: '/Home.html',
          controller: 'HomeCtrl'//our new state should be controlled by MainCtrl
      })
     .state('InlogLeerkracht', {
         url: '/InlogLeerkracht',
         templateUrl: '/InlogLeerkracht.html',
         controller: 'InlogLeerkrachtCtrl'
     })
     .state('InlogLeerling', {
         url: '/InlogLeerling',
         templateUrl: '/InlogLeerling.html',
         controller: 'InlogLeerlingCtrl'
     })
    .state('SignUp', {
        url: '/SignUp',
        templateUrl: '/SignUp.html',
        controller: 'SignUpCtrl'
    })
  
    $urlRouterProvider.otherwise('Home');//specified what should happen if the app receives a URL that is not defined.
}]);

app.controller('HomeCtrl', ['$scope', '$state', function ($scope,$state) {
    $scope.changestate = function (path) {
        $state.go(path);
    };
}]);

app.controller('InlogLeerkrachtCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.changestate = function (path) {
        $state.go(path);
    };
}]);

app.controller('InlogLeerlingCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.changestate = function (path) {
        $state.go(path);
    };
}]);

app.controller('SignUpCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.changestate = function (path) {
        $state.go(path);
    };
}]);