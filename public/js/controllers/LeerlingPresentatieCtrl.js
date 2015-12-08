angular.module('LeerlingPresentatieCtrl', []).config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])
  .controller('LeerlingPresentatieController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {

  $scope.lesID = $routeParams.lesID;
  $http.get('/api/LessenDataLeerling/' + $scope.lesID)
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

        $scope.vragen=[];
        $scope.currentVraag=0;

        $scope.slickConfig = {
          method: {},
          dots: true,
          infinite: false,
          slidesToShow: 1 ,
          slidesToScroll: 1,
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
          }
        }
        };



      $scope.templates =
   [ { name: 'open', url: 'views/LeerlingPresentatie/LeerlingPresentatieOpen.html'},
   { name: 'cloud', url: 'views/LeerlingPresentatie/LeerlingPresentatieCloud.html'},
     { name: 'multi', url: 'views/LeerlingPresentatie/LeerlingPresentatieMulti.html'} ];
      $scope.template = $scope.templates[1];


      document.body.style.background = "#F4FA58 url('../img/Logo.png') no-repeat right top"

      }]);
