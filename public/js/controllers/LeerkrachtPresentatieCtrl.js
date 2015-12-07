angular.module('LeerkrachtPresentatieCtrl', []) .config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])

.controller('LeerkrachtPresentatieController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {

  document.body.style.background = "#CEF6F5 url";

  $scope.vragen=[];
  $scope.currentVraag=0;



  $scope.lesID = $routeParams.lesID;
  $http.get('/api/LessenData/' + $scope.lesID)
      .success(function(data) {
          $scope.les = data; //Expose the user data to your angular scope
          $scope.vragen=data.vragen;
          if($scope.vragen[0].soort=="open"){
            alert(data.token);
            console.log("open");
               $scope.template = $scope.templates[0];
           }else if($scope.vragen[0].soort=="meerkeuze"){
               console.log("meerkeuze");
               $scope.template = $scope.templates[2];
           }else{
             console.log("multi");
             $scope.template = $scope.templates[1];
           }
           $http.post('/activateVraag', {
                   les_id:   $scope.lesID,
                   currentVraag_id:$scope.vragen[0]._id,
               })
               .success(function(data) {
               });

      });

      $scope.slickConfig = {
        method: {},
        dots: true,
        infinite: false,
        slidesToShow: 1 ,
        slidesToScroll: 1,
        prevArrow:"",
        event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          console.log('beforeChange');
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          console.log('after change');
            $scope.currentVraag=currentSlide;
          if($scope.vragen[currentSlide].soort=="open"){
            $scope.$apply(function () {
               $scope.template = $scope.templates[0];
              });
                  console.log($scope.template);
           }else if($scope.vragen[currentSlide].soort=="meerkeuze"){
             $scope.$apply(function () {
                $scope.template = $scope.templates[2];
               });
                  console.log($scope.template);
           }else{
             $scope.$apply(function () {
                $scope.template = $scope.templates[1];
               });
                console.log($scope.template);
           }
           $http.post('/changeActiefVraag', {
                   les_id:   $scope.lesID,
                   currentVraag_id:$scope.vragen[currentSlide]._id,
                   previousVraag_id:$scope.vragen[currentSlide-1]._id
               })
               .success(function(data) {
               });
        }
      }
      };




          $scope.templates =
          [ { name: 'open', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieOpen.html'},
          { name: 'cloud', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieCloud.html'},
          { name: 'multi', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieMulti.html'} ];


          $scope.stopLes=function(id){
            $http.post('/StopLeerkrachtPresentatie/'+id)
                .success(function(data) {
                });
                $http.post('/deactivateVraag', {
                        les_id:   $scope.lesID,
                        currentVraag_id:$scope.vragen[$scope.currentVraag]._id
                    })
                    .success(function(data) {
                    });
          };


}])  ;
