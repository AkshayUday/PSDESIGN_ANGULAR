myapp = angular.module('myApp', ['ngSanitize', 'toggle-switch']);
myapp.controller('globalCtrl', function($scope, $http) {
	$scope.myArrayData =[];
  $http.get("./data.json").success(function (response) {
      $scope.myData = (response.ReadFeaturesResponse.feature); 
  });
});
