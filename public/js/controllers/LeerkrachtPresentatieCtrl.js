angular.module('LeerkrachtPresentatieCtrl', []) .config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])

.controller('LeerkrachtPresentatieController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {

  document.body.style.background = "#CEF6F5 url";

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
          changeTemplate(currentSlide);
        }
      }
      };


      var changeTemplate=function(currentSlide){
        if($scope.vragen[currentSlide].soort=="open"){
             $scope.template = $scope.templates[0];
                console.log($scope.template);
             document.body.style.background = "blue";
         }else if($scope.vragen[currentSlide].soort=="meerkeuze"){
             $scope.template = $scope.templates[2];
                console.log($scope.template);
             document.body.style.background = "pink";
         }else{
           $scope.template = $scope.templates[1];
              console.log($scope.template);
           document.body.style.background = "yellow";

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
