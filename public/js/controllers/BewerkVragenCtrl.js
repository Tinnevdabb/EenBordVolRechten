angular.module('BewerkVragenCtrl', []).controller('BewerkVragenController', ['$http', '$scope', '$routeParams', function($http, $scope,$routeParams) {
  $scope.lesID = $routeParams.lesID;
  console.log($scope.lesID);
  $scope.vraagID = $routeParams.vraagID;
  console.log($scope.vraagID);
  $scope.mutli=false;

  $http.get('/api/LeerkrachtNaam/')
      .success(function(data) {
          $scope.leerkrachtNaam = data; //Expose the user data to your angular scope

        });


  $http.get('/api/LessenData/' + $scope.lesID +'/' + $scope.vraagID )
      .success(function(data) {
          $scope.vraag = data; //Expose the user data to your angular scope
          console.log($scope.vraag.vraag);
          $scope.newVraag=$scope.vraag.vraag;
          if($scope.vraag.soort=="meerkeuze"){
            $scope.multi=true;
            console.log("meerkeuze");
          }

      });

        $scope.editVraag=function(){
          $http.post('/editVraag',{
            vraag:this.newVraag, //this komt van html pagina
            lesID:$scope.lesID,
            vraagID:$scope.vraagID
          })
          .success(function(data) {
              $scope.vraag = data; //Expose the user data to your angular scope
          });
        };

        $scope.editVraagSoort=function() {
            var e = document.getElementById("VraagSoort");
          var soortValue = e.options[e.selectedIndex].value;
          console.log(soortValue);
                  $http.post('/editVraagSoort', {
                          lesID: $scope.lesID,
                          vraagID:$scope.vraagID,
                          soort: soortValue

                      })
                      .success(function(data) {
                        $scope.vraag = data;
                      });
              };


              $scope.addOplossing = function(oplossing) {

                $http.post('/addOplossing/', {
                  lesID:$scope.lesID,
                  vraagID:$scope.vraagID,
                  oplossing:this.Oplossing

                })
                    .success(function(data) {
                        $scope.vraag = data;
                        $scope.Oplossing = null;

                    })

                  };


                  $scope.giveID=function(id){
                    $scope.oplID=id;
                  }

                //DELETEOPLOSSING
                      $scope.customButtonDelete={
                        danger: {
                        label: "Delete",
                        className: "btn-danger",
                        callback: function() {
                          $http.put('/deleteOplossing/', {
                            lesID:$scope.lesID,
                            vraagID:$scope.vraagID,
                            oplossingID:$scope.oplID

                          })
                              .success(function(data) {
                                  $scope.vraag = data;
                              })
                              .error(function(data) {
                                  console.log('Error: ' + data);
                              });
                         }
                        },
                        main: {
                        label: "Cancel",
                        className: "btn-default",
                        callback: function() {}
                      }
                    };


                $scope.addMedia=function() {
                    var e = document.getElementById("MediaSoort");
                  var soortValue = e.options[e.selectedIndex].value;
                  if(soortValue=="video")
                  {
                    var url= this.newMedia;
                     url = url.replace("watch?v=", "embed/");//embed to let video show on mobile and desktop ('v/' works, but only for desktop)
                  }else{
                    var url= this.newMedia;
                  }

                          $http.post('/addMedia', {
                                  lesID:$scope.lesID,
                                  vraagID:$scope.vraagID,
                                  media:url,
                                  soort: soortValue
                              })
                              .success(function(data) {
                                $scope.newMedia =null; // clear the form so our user is ready to enter another
                                $scope.les = data;
                              });
                      };










document.body.style.background = "#D8D8D8 url('../img/Achtergrond.png') no-repeat right top"
}]);
