// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope) {

  $scope.changestate = function (path) {
          $state.go(path);
      };

});
