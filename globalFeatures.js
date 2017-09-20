myapp = angular.module('myApp', ['ngSanitize']);
myapp.controller('globalCtrl', function($scope, $http) {
	$scope.myArrayData =[];

	$scope.test= function(v){
		if (v)
		{return 'toggle btn btn-default off';}
		else {
			{
				return 'toggle btn btn-primary';
			}
		}

	};
	$scope.toggle = function(id,dat) {
    $scope.variable = !$scope.variable
    console.log($scope.variable,id);
}

$scope.counter = 0;
		 $scope.change = function(chng,inx) {
			 if(chng){
				 $scope.showMessage = inx;
			 }

			 console.log('changed');
		 };

$scope.stateChanged = function (qId) {
   if($scope.myData[qId]){ //If it is checked
       alert('test');
   }
}
  $http.get("./data.json").success(function (response) {
      $scope.myData = (response.ReadFeaturesResponse.feature);
  });
});
