
myapp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
myapp.controller('planCtrl',function($scope,$timeout,$http,$state) {
    //alert("load this"); 
	$('#searchInput').focus();
//	var plansponsorState = function(){
//		console.log($state);
//	}
	$scope.showLimitError = $scope.showResultTable = $scope.systemDown = $scope.errorSet = $scope.serviceTimeout = $scope.psumryError = false;
	     
	
	$scope.searchFun = function(){
		
		$scope.showLimitError = $scope.showResultTable = $scope.systemDown = $scope.errorSet = $scope.serviceTimeout = $scope.psumryError = false;
		$scope.toggle = false;
		if(!$scope.DataEntered || $scope.DataEntered.length < 7 ){
			$scope.showLimitError = true;
		}
		
		else{
			$scope.showLimitError = false;
			$scope.searchKey = $scope.DataEntered;
			waitingDialog.show();
			$timeout(function () {$http({
				  method: 'GET',
				  url: 'plansponsorSearch?controlNumber='+$scope.DataEntered,
				  	}).success(function (data) {
				  	 console.log('success response', data);					  
				      if(data.code == 200){
				    	  $scope.psDetails = data.plansponsorResponse.ReadPlanSponsorsResponse.planSponsors[0];
				    	  $scope.psuid = $scope.psDetails.planSponsorId;
				    	  $scope.valCount = $scope.psDetails.accountStructure.length;
						  $scope.showResultTable = true;
						  //$scope.selectControlNumber = parseInt($scope.DataEntered);
				      }
				      else if (data.code == 500){
				    	 
				    	  $scope.systemDown = true;
				      }
				      else if(data.code ==  555){
				    	  $scope.errorSet = true;
				    	  var errorObject = data.errorMessage;
				    	  $scope.errorData = errorObject.split('|')[1].split(']')[0];
				    	  console.log($scope.errorData);
				      }
				      else{
				    	  //$scope.serviceTimeout = true;
				    	  console.log('Session timed out');
				    	  $(location).attr('href', '../service/home');					      
				      }
				
				    })
			    .catch(function (err) {
			    	$scope.serviceTimeout = true;
			    	console.log('failure response', err);
			    })
			    .finally(function () {
			    	waitingDialog.hide();
			    });
			  }, 300);
		}
	  }
	$scope.clearData = function() {
		$scope.DataEntered = "";
		$('#searchInput').focus();
	};
	$scope.getPSDetails = function() 
	{
		 $scope.psumryError = false;
		$timeout(function () {$http({
			  method: 'GET',
			  //url: 'getPSDetails?psuid='+$scope.psuid,
			  url: 'getPSDetails?controlNumber='+$scope.DataEntered,
			  	}).success(function (data) {
			  	 console.log('success response');	
			  	
			      if(data.getCategoryFeaturesCode == 200 && data.getToggleInfo.getToggleLevelCode == 200){
			    	  console.log(data);
			    	  $state.go('PLANSPONSOR.SUMMARY',{obj:data});
			    	  
			      }
			      else if (data.getCategoryFeaturesCode == 500 || data.getToggleInfo.getToggleLevelCode == 500){
			    	 // $scope.systemDown = true;
			      }
			      else if(data.getToggleInfo.getToggleLevelCode ==  555){
			    	  console.log(data);
			    	  var errorObject = data.getToggleInfo.errorMessage;
			    	  $scope.psErrorData = errorObject.split('|')[1].split(']')[0];
			      }
			
			    })
		    .catch(function (err) {
		      
		        console.log('failure response', err)
		    })
		    .finally(function () {
		    	
		    });
		  }, 2000);
		}                 
	});
