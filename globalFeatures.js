


myapp = angular.module('myApp', ['ngSanitize']);
myapp.controller('globalCtrl', function($scope,$window, $http) {
	  
	console.log($window.cardData)
	   $scope.myData = ($window.cardData.ReadFeaturesResponse.feature);
	
	$scope.test= function(v){
		if (!v)
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
		/* $scope.change = function(chng,inx) {
			 if(!chng){
				 $scope.showMessage = inx;
			 }

			 console.log('changed');
		 };*/
		 
		 $scope.change = function(obj, inx) {
			    if (!obj.enabled) {
			      $scope.showMessage = inx;
			    };

			  var Pdata = { name: obj.name, enabled: !obj.enabled, resourceId: obj.featureIdentifier.
resourceId};


			    // Show saving gif spinner.
				  $scope.loading = true;
				  $scope.inx1 = inx;

				    // POST request :
				$timeout(function () {$http({
				  method: 'POST',
				  url: 'updateGlobalFeatures',
				  data: Pdata,
				  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function (data) {
				      // Do stuff with data.
				      console.log('success response', data)
				    })
				    .catch(function (err) {
				      // Log error somehow.
					console.log('failure response', err)
				    })
				    .finally(function () {
				      // Hide loading spinner whether our call succeeded or failed.
				      console.log('checking whether loading is working')
				      $scope.loading = false;
				    });
				  }, 2000);

				    console.log('changed1', obj.enabled);
				  };  
			 
			 
$scope.stateChanged = function (qId) {
   if($scope.myData[qId]){ //If it is checked
       alert('test');
   } }
//  $http.get("script/data.json").success(function (response) {
//      $scope.myData = (response.ReadFeaturesResponse.feature);
//  });
});
