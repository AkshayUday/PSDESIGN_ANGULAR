myapp.controller('summaryCtrl',function($scope,$window,$state,$stateParams,$filter){
//	var plansponsorState = function(){
//		console.log($state);
//	}
	
	
	
	/*
	$scope.errorData = $stateParams.obj;
	$scope.errorSet = true;
	
	
	console.log('getting'+$stateParams.obj);
	
	$scope.psName = "Aetna";
    $scope.psuId = "12345";
    $scope.stateChange = function()
    {
    	$state.go('PLANSPONSOR.SPONSOR');
    }
    $scope.viewAllCount = 124;
    $scope.resData = {
    		  "getCategoryFeaturesResponse": {
    			    "ReadCategoryFeaturesResponse": {
    			      "totalFeaturesCount": 31,
    			      "featureSet": [
    			       
    			        {
    			          "featuresCount": 1,
    			          "category": {
    			            "categoryName": "Benefits",
    			            "categoryDescription": "Benefits"
    			          },
    			          "features": [
    			            {
    			              "featureIdentifier": {
    			                "resourceId": "110004~BenTracker",
    			                "idValue": "BenTracker"
    			              },
    			              "description": "Benefits Tracker",
    			              "name": "Benefits Tracker"
    			            }
    			          ]
    			        },
    			       
    			        {
    			          "featuresCount": 3,
    			          "category": {
    			            "categoryName": "Provider",
    			            "categoryDescription": "Provider"
    			          },
    			          "features": [
    			            {
    			              "featureIdentifier": {
    			                "resourceId": "110004~BHCarveOut",
    			                "idValue": "BHCarveOut"
    			              },
    			              "description": "Excludes behavioral health specialties/procedures in search and allows front end display rules on BH providers via name search",
    			              "name": "Behavioral Health Carve Out"
    			            },
    			            {
    			              "featureIdentifier": {
    			                "resourceId": "110004~ProviderSearch",
    			                "idValue": "ProviderSearch"
    			              },
    			              "description": "Enables member to search for a provider by specialty or name",
    			              "name": "Provider Search"
    			            },
    			            {
    			              "featureIdentifier": {
    			                "resourceId": "110004~Telemedicine",
    			                "idValue": "Telemedicine"
    			              },
    			              "description": "Enables member to view and price telemedicine providers",
    			              "name": "Telemedicine"
    			            }
    			          ]
    			        }
    			      ]
    			    }
    			  },
    			  "getCategoryFeaturesCode": 200,
    			  "getToggleInfo": {
    			    "getToggleLevelCode": 200,
    			    "getPlanSponsorResponse": {
    			      "ReadFeaturesResponse": {
    			        "featureSet": [
    			          {
    			            "featureLevelId": "AA",
    			            "features": [
    			              {
    			                "enabled": true,
    			                "resourceId": "110004~AccExpanded"
    			              },
    			              {
    			                "enabled": true,
    			                "resourceId": "110004~AetnaHealthEnabled"
    			              }
    			              
    			            ]
    			          },
    			          {
    			            "featureLevelId": "AB",
    			            "features": [
    			              {
    			                "enabled": true,
    			                "resourceId": "110004~AccExpanded"
    			              },
    			              {
    			                "enabled": true,
    			                "resourceId": "110004~AetnaHealthEnabled"
    			              }
    			            ]
    			          },
    			          {
    			            "featureLevelId": "AC",
    			            "features": [
    			              {
    			                "enabled": true,
    			                "resourceId": "110004~AccExpanded"
    			              },
    			              {
    			                "enabled": true,
    			                "resourceId": "110004~AetnaHealthEnabled"
    			              }
    			            ]
    			          }
    			        ]
    			      }
    			    }
    			  }
    			};
    
    */
    
    
   if(typeof($stateParams.obj) == "string"){
       
	   $scope.psErrorData = $stateParams.obj;
		$scope.hideTable = true;
		$scope.psumryError = true;
   }
   else if(typeof($stateParams.obj) == "boolean"){
	  
	  	$scope.hideTable = true;
	  	$scope.systemDown = true;
	   
   }else{
	   $scope.psumryError = false;
	   $scope.hideTable = false;
	  	$scope.systemDown = false;	  
	    $scope.stateChange = function()
	    {
	    	$state.go('PLANSPONSOR.SPONSOR',{source:'summary'});
	    }
	    $scope.summaryObject = $stateParams.obj || JSON.parse(localStorage.getItem('summaryResponse'));
	    $scope.catFeatures=$scope.summaryObject.getCategoryFeaturesResponse.ReadCategoryFeaturesResponse; 
		$scope.psName = $scope.summaryObject.nameFull;
	    $scope.psuId = $scope.summaryObject.planSponsorId;
	    console.log('PSUID',$scope.summaryObject)
	    $scope.myData = ($scope.summaryObject.getCategoryFeaturesResponse.ReadCategoryFeaturesResponse.featureSet);
	    $scope.toggleData = $scope.summaryObject.getToggleInfo.getPlanSponsorResponse.ReadFeaturesResponse.featureSet;
	    console.log($scope.myData,'texttttttt');
	    $scope.showItems = 'View All';   
	    $scope.showPopover=false;
	    $scope.expand=false;
	    $scope.selected = 'View All';
	    $scope.viewAll = true;
	    $scope.categorydescription = 'View All';
	    $scope.isFirstPage = true;
	     // findByKey is used to find an object inside an array
	 // of object, by the value of a key.
	 function findByKey (array, key, value,outkey) {
	 	return array.filter(function (obj) {
//console.log('object',key,obj);
	 		return  obj[key] === value;
	 	})[0];
	 }
	 
	
	    
	    $scope.showFeature = function(selItemName, ind){
	    // $scope.viewAll = false;
	    console.log('selected is ',selItemName);
	    if(selItemName == 'View All'){
		      $scope.viewAll = true;
		      $scope.showItems = 'View All';
		      var featureSets = $scope.myData;

			  $scope.viewAllCount = $scope.catFeatures.totalFeaturesCount
		      $scope.selectedData = [];
		      $scope.serialData = [];
		      angular.forEach(featureSets, function (featureSet) {
		    	  var featureObjs= featureSet.features;
		    	  angular.forEach(featureObjs, function (featureObj) {
		    		  $scope.serialData.push(featureObj);
		    	  });
		    	});
		      
		      $scope.selectedData = $scope.serialData.map(function (group) {
					console.log('inside',$scope.toggleData,$scope.toggleData[0].featureLevelId);
					$scope.toggleData.map(function(data){
						return {
							resourceId: group.resourceId,
							enabled: findByKey(data.features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
							name: group.name,
							featureLevelId: data.featureLevelId
							
						};
					})
				
			});
				
			$scope.selectedData = $filter('orderBy')($scope.selectedData,'name');
			console.log('selected data is ',$scope.selectedData)
		      
		      
//		      $scope.myData = $scope.resData;
//		      $scope.categorydescription = 'View All';
		       $scope.selected = ind;
	    	}else{
		        $scope.viewAll = false;
		        $scope.isFirstPage = true;
		        $scope.serialData = selItemName.features;
		        $scope.selectedData = $scope.serialData.map(function (group) {
					console.log('inside',group);
				return {
					resourceId: group.resourceId,
					enabled: findByKey($scope.toggleData[0].features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
					name: group.name
					
				};
			});
		        console.log('testdata',$scope.selectedData);
//		         $scope.categorydescription = selItemName.featureCategory.categoryDescription;
//		         $scope.featureCount = 40;
		         $scope.selected = ind;
	    	}
	    	$scope.$broadcast('categoryChangedEvent');
	    	$window.scrollTo(0, angular.element('.shadow-box').offsetTop);
    }
	    $scope.showFeature('View All','showAllInx');
   }
    });

myapp.directive('planSummaryDetails',function(){
	return{
		
		restrict: 'E',
		scope:{},
		controller:function($scope){
			$scope.summary = {
		        fundingType: "Self Insured",
		        benefitType: "Medical",
		        effecitveDate : "01/01/2017 to 12/31/2017"
		    };
		},
		templateUrl: '../script/planSummaryDetails.html'
	};
	
});

myapp.directive('summaryFeatureDetails',function(){
	return{
		restrict: 'E',
		scope:true,
		controller:function($scope){
			$scope.columnPerPage = 5;
			$scope.currentPage = 0;
			$scope.currentColumns = [];
			$scope.totalNumberOfPage = Math.floor($scope.selectedData.length/$scope.columnPerPage);
			if (($scope.selectedData.length % $scope.columnPerPage) > 0){
				$scope.totalNumberOfPage = $scope.totalNumberOfPage + 1;
			}
			
			console.log($scope.totalNumberOfPage);

			$scope.currentColumns = $scope.selectedData.slice($scope.columnPerPage*$scope.currentPage,Math.min($scope.selectedData.length, $scope.columnPerPage));
			
			$scope.$on('categoryChangedEvent',function(){
				if($scope.isFirstPage){

					$scope.totalNumberOfPage = Math.floor($scope.selectedData.length/$scope.columnPerPage);
					if (($scope.selectedData.length % $scope.columnPerPage) > 0){
						$scope.totalNumberOfPage = $scope.totalNumberOfPage + 1;
					}
					
					$scope.currentPage = 0;
					$scope.currentColumns = $scope.selectedData.slice($scope.columnPerPage*$scope.currentPage,Math.min($scope.selectedData.length, $scope.columnPerPage));
				}
			});
			
			$scope.next = function(){
				if ($scope.currentPage <= $scope.totalNumberOfPage -2){
					$scope.currentPage = $scope.currentPage +1 ;
					//$scope.currentColumns.length = 0;
					//$scope.isFirstPage = false;
					if ($scope.currentColumns.length > 0){
						
						while($scope.currentColumns.length > 0){
							$scope.currentColumns.pop();
						}
						
						$scope.currentColumns = [];
					}
					
					if (($scope.currentPage === $scope.totalNumberOfPage - 1 ) 
							&& ($scope.selectedData.length % $scope.columnPerPage) > 0){
						for (var i = $scope.columnPerPage*$scope.currentPage; 
									i < ($scope.columnPerPage*$scope.currentPage) + 
									($scope.selectedData.length % $scope.columnPerPage); i++){
							$scope.currentColumns.push($scope.selectedData[i]);
						}
					} else {
					
						for (var i = $scope.columnPerPage*$scope.currentPage; i < $scope.columnPerPage*$scope.currentPage + $scope.columnPerPage ; i++){
							$scope.currentColumns.push($scope.selectedData[i]);
						}
					}
					
				}
			}
			
			$scope.prev = function(){
				if($scope.currentPage >=1){
					$scope.currentPage = $scope.currentPage -1 ;
					//$scope.currentColumns.length = 0;
					//$scope.isFirstPage = false;
					if ($scope.currentColumns.length > 0){
						
						while($scope.currentColumns.length > 0){
							$scope.currentColumns.pop();
						}
						
						$scope.currentColumns = [];
					}
					
					for (var i = $scope.columnPerPage*$scope.currentPage; i < $scope.columnPerPage*$scope.currentPage + $scope.columnPerPage ; i++){
						$scope.currentColumns.push($scope.selectedData[i]);
					}
					
				}
			}
			
		},
		templateUrl:'../script/featureDetails.html'
	};
});

myapp.directive('summaryCategoryList',function(){
	return {
		restrict:'E',
		templateUrl:'../script/categoryList.html'
	}
});
