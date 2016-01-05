angular.module('PasswordCtrl', []).controller('PasswordController',  ['$http',"$rootScope", '$scope', function($http, $rootScope, $scope) {


  $scope.changePassword=function(newPass){
    $http.post('/changePassword', {
      newPassword1:this.password1,
      newPassword2:this.password2
        })
        .success(function(data) {
        });
  }


}]);
