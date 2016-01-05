angular.module('ResetCtrl', []).controller('ResetController',  ['$http',"$rootScope", '$scope',"$routeParams", function($http, $rootScope, $scope, $routeParams) {
  $scope.token = $routeParams.token;

  $scope.resetPassword=function(newPass){
    $http.post('/reset/'+  $scope.token, {
      newPassword1:this.password1,
      newPassword2:this.password2
        })
        .success(function(data) {
        });
  }

  document.body.style.background = "#D8D8D8 url('../img/Achtergrond.png') no-repeat right top"

}]);
