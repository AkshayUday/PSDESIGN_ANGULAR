myapp.controller('planCtrl', function($scope, $http, $timeout) {
  $scope.searchFun = function(){
    $scope.searchKey = $scope.DataEntered;
  }
})
