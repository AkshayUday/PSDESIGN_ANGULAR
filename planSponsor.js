myapp.controller('planCtrl',function($scope,$timeout,$http) {
    //alert("load this"); 
	$scope.showLimitError = false;
        $scope.checkNumberFieldLength = function(elem) {
    	if (elem > 9999999) {
            elem= elem.toString().slice(0,7); 
        }
    	$scope.DataEntered = parseInt(elem);
	};
	$scope.searchFun = function(){
		if($scope.DataEntered < 1000000){
			$scope.showLimitError = true;
		}
		else{
			$scope.showLimitError = false;
			$scope.searchKey = $scope.DataEntered;
//			$scope.psDetails = { ss:{1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567,1234567}};
			$scope.psDetails = {
					0:1234567,
					1:1234567,
					2:1234567,
					3:1234567,
					4:1234567,
					5:1234567,
					6:1234567,
					7:1234567,
					8:1234567,
					9:1234567,
					10:1234567,
					11:1234567,
					12:1234567,
					13:1234567,
					14:1234567,
					15:1234567,
					16:1234567,
					17:1234567,
					18:1234567,
					19:1234567,
					20:1234567,
					21:1234567
					
			};
			$scope.cnCount = 10;
			$timeout(function () {$http({
				  method: 'GET',
				  url: 'getPSDetails',
				 data: JSON.stringify($scope.DataEntered),
				  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function (data) {
					  console.log('success response', data);
				    
				      if(data.code == 200){
				    	
				      }
				      else if (data.code == 500){
				    	 
			    	 
				      }
				      else{
				    	  
				      }
				
				    })
			    .catch(function (err) {
			      
			        console.log('failure response', err)
			    })
			    .finally(function () {
			     
			    });
			  }, 2000);
		}
	  }
	$scope.clearData = function() {
		$scope.DataEntered = "";
	};
                 });
