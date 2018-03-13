
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
myapp.controller('planCtrl',function($scope,$timeout,$http,$state,$stateParams,$location) {
    //alert("load this");
	//$location.path = 'ps/sponsor';
	
   
	$('#searchInput').focus();
//	var plansponsorState = function(){
//		console.log($state);
//	}
	$scope.showLimitError = $scope.showResultTable = $scope.systemDown = $scope.errorSet = $scope.serviceTimeout = $scope.psumryError = false;
	if($stateParams.source){		
		  $scope.psDetails = JSON.parse(localStorage.getItem('controlNumbers'));  	 
	  	  $scope.psuid = $scope.psDetails.planSponsorId;
	  	  $scope.valCount = $scope.psDetails.accountStructure.length;
	  	  $scope.searchKey = $scope.DataEntered = $scope.psDetails.controlNum;
		$scope.showResultTable = true;
		}
		else{
			localStorage.clear();
		}    
		
	$scope.searchFun = function(){
		localStorage.clear();
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
				    	  var sponsorDetails = $scope.psDetails;
				    	  sponsorDetails.controlNum = $scope.searchKey;
				    	  localStorage.setItem('controlNumbers',JSON.stringify(sponsorDetails));
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
			  },900);
		}
	  }
	$scope.clearData = function() {
		$scope.DataEntered = "";
		$('#searchInput').focus();
	};
	$scope.getPSDetails = function() 
	{
		waitingDialog.show('Loading...');
		 $scope.psumryError = false;
		$timeout(function () {$http({
			  method: 'GET',
			  url: 'getPSDetails?psuid='+$scope.psuid,
			  //url: 'getPSDetails?controlNumber='+$scope.DataEntered,
			  	}).success(function (data) {
			  	 console.log('success response');	
			  	
			      if(data.getCategoryFeaturesCode == 200 && data.getToggleInfo.getToggleLevelCode == 200){
			    	  console.log(data);
			    	  var summaryData = data;
			    	  summaryData.planSponsorId = $scope.psDetails.planSponsorId;
			    	  summaryData.nameFull = $scope.psDetails.nameFull;
			    	  localStorage.setItem('summaryResponse', JSON.stringify(summaryData));
			    	  $state.go('PLANSPONSOR.SUMMARY',{obj:summaryData});
			    	  
			      }
			      else if (data.code == 500){
			    	  $scope.systemDown = true;
			    	  
			    	  $state.go('PLANSPONSOR.SUMMARY',{obj:$scope.systemDown});
			      }
			      else if(data.getCategoryFeaturesCode ==  555){
			    	  console.log(data);
			    	  $scope.psumryError = true;
			    	  var errorObject = data.errorMessage;
			    	  $scope.errorData = errorObject.split('|')[1].split(']')[0];
			    	  $state.go('PLANSPONSOR.SUMMARY',{obj:$scope.errorData});
			      }
			      else if(data.getToggleInfo && data.getToggleInfo.getToggleLevelCode ==  555){
			    	  console.log(data);
			    	  $scope.psumryError = true;
			    	  var errorObject = data.getToggleInfo.errorMessage;
			    	  $scope.errorData = errorObject.split('|')[1].split(']')[0];
			    	  $state.go('PLANSPONSOR.SUMMARY',{obj:$scope.errorData});
			      }
			      else{
			    	  $(location).attr('href', '../service/home');
			      }
			
			    })
		    .catch(function (err) {
		      
		        console.log('failure response', err)
		    })
		    .finally(function () {
		    	waitingDialog.hide();
		    });
		  }, 900);
		}  
	$location.path('ps/sponsor');
	});
