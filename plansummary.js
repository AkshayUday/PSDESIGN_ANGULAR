myapp.controller('summaryCtrl',function($scope,$window,$state){
	
	$scope.psName = "Aetna";
    $scope.psuId = "12345";
    $scope.summary = {
        fundingType: "Self Insured",
        benefitType: "Medical",
        effecitveDate : "01/01/2017 to 12/31/2017"
    };
    $scope.stateChange = function()
    {
    	$state.go('PLANSPONSOR.SPONSOR');
    }
    $scope.viewAllCount = 124;
    $scope.resData = ($window.cardData.ReadFeaturesResponse.feature);
    $scope.myData = $scope.resData;
    $scope.showItems = 'View All';
    $scope.showPopover=false;
    $scope.expand=false;
    $scope.selected = 'View All';
    $scope.viewAll = true;
    $scope.categorydescription = 'View All';
    $scope.featureCount = 60;
    $scope.show = function(selItemName, ind){
    // $scope.viewAll = false;
    console.log('selected is ',selItemName);
    if(selItemName == 'View All'){
	      $scope.viewAll = true;
	      $scope.showItems = 'View All';
//	      $scope.myData = $scope.resData;
//	      $scope.categorydescription = 'View All';
	       $scope.selected = ind;
    	}else{
	        $scope.viewAll = false;
//	         $scope.categorydescription = selItemName.featureCategory.categoryDescription;
//	         $scope.featureCount = 40;
	         $scope.selected = ind;
    	}
    	$window.scrollTo(0, angular.element('.shadow-box').offsetTop);
    }
 
    });
