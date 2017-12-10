myapp.controller('summaryCtrl',function($scope,$window,$state,$stateParams){
//	var plansponsorState = function(){
//		console.log($state);
//	}
	
	
	
	
	console.log('getting'+$stateParams.obj);
	
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
    
    
    
    
   
    
    $scope.myData = $stateParams.obj.getCategoryFeaturesResponse.ReadCategoryFeaturesResponse.featureSet;
    $scope.toggleData = $stateParams.obj.getToggleInfo.getPlanSponsorResponse.ReadFeaturesResponse.featureSet;
    
    
    console.log($scope.toggleData,'texttttttt');
    $scope.showItems = 'View All';   
    $scope.showPopover=false;
    $scope.expand=false;
    $scope.selected = 'View All';
    $scope.viewAll = true;
    $scope.categorydescription = 'View All';
    $scope.featureCount = 60;
    
    $scope.showFeature = function(selItemName, ind){
    // $scope.viewAll = false;
    console.log('selected is ',selItemName);
    if(selItemName == 'View All'){
	      $scope.viewAll = true;
	      $scope.showItems = 'View All';
	     var featureSets = $scope.myData;
	     $scope.selectedData = [];
	      angular.forEach(featureSets, function (featureSet) {
	    	  var featureObjs= featureSet.features;
	    	  angular.forEach(featureObjs, function (featureObj) {
	    		  $scope.selectedData.push(featureObj);
	    	  });
	    	});
//	      $scope.myData = $scope.resData;
//	      $scope.categorydescription = 'View All';
	       $scope.selected = ind;
    	}else{
	        $scope.viewAll = false;
	        $scope.selectedData = selItemName.features;
//	         $scope.categorydescription = selItemName.featureCategory.categoryDescription;
//	         $scope.featureCount = 40;
	         $scope.selected = ind;
    	}
    	$window.scrollTo(0, angular.element('.shadow-box').offsetTop);
    }
    $scope.showFeature('View All','showAllInx');
    });
