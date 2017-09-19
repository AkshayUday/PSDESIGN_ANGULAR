myapp = angular.module('myApp', []);
myapp.controller('globalCtrl', function($scope, $http) {
  $http.get("script/data.json").success(function (response) {
      $scope.myData = (response.ReadFeaturesResponse.feature);    
  });
});