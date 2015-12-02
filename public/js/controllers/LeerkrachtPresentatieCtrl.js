angular.module('LeerkrachtPresentatieCtrl', []) .config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])

.controller('LeerkrachtPresentatieController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {

  $scope.vragen=[];




  $scope.lesID = $routeParams.lesID;
  $http.get('/api/LessenData/' + $scope.lesID)
      .success(function(data) {
          $scope.les = data; //Expose the user data to your angular scope
          $scope.vragen=data.vragen;
          if($scope.vragen[0].soort=="open"){
            console.log("open");
               $scope.template = $scope.templates[0];
           }else if($scope.vragen[0].soort=="meerkeuze"){
               console.log("meerkeuze");
               $scope.template = $scope.templates[2];
           }else{
             console.log("multi");
             $scope.template = $scope.templates[1];
           }
      });

      $scope.SetPreview = function(vraag)
          {
              //here logic which can take object from diffrent location
              console.log(vraag);
              return vraag;
          };


      $scope.slickConfig = {
        method: {},
        dots: true,
        infinite: true,
        slidesToShow: 1 ,
        slidesToScroll: 1,
        event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          console.log('beforeChange');

        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          console.log('after change');
          if($scope.vragen[currentSlide].soort=="open"){
               $scope.template = $scope.templates[0];
           }else if($scope.vragen[currentSlide].soort=="meerkeuze"){
               $scope.template = $scope.templates[2];
           }else{
             $scope.template = $scope.templates[1];
           }
        }
      }
      };
          $scope.templates =
          [ { name: 'open', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieOpen.html'},
          { name: 'cloud', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieCloud.html'},
          { name: 'multi', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieMulti.html'} ];


          $scope.stopLes=function(id){
             $location.path( '/BeheerLessen' );
          };


}])  ;
