myapp.controller('summaryCtrl',function($scope,$window,$state,$stateParams,$filter,$compile,$timeout,$http){
	$scope.stateChange = function()
    {
    	$state.go('PLANSPONSOR.SPONSOR',{source:'summary'});
    } ;   
   $scope.showCntrlDetails = function($event,cntrlNum){
    	var currentRow = document.getElementById(cntrlNum);
    	console.log(cntrlNum);
    	if(currentRow.nextElementSibling){
    	var nextRow = currentRow.nextElementSibling.className.indexOf('childRow')>-1 ? true : false;
    	}
    	else{
    		var nextRow = false;
    	}
    	if(!nextRow ){
    		
    	//waitingDialog.show('Loading...');
   		 $scope.psumryError = false;
   		$timeout(function () {$http({
   			  method: 'GET',
   			  url: 'getPSDetails?controlNumber='+cntrlNum,
   			  	}).success(function (data) {
   			  	 console.log('success response');	
   			  	
   			      if(data.getCategoryFeaturesCode == 200 && data.getToggleInfo.getToggleLevelCode == 200){
   			    	  console.log(data);
   			    	angular.forEach($scope.controls, function(item, key){
   			    		if(item.featureLevelId == [$(currentRow || "").attr("id")]){
   			    			if(item.summaryResponse){
   			    				delete item.summaryResponse;
   			    				$event.target.src = '../themes/css2/icons/plus.png';
   			    				return;
   			    			}
   			    			item.summaryResponse = data.getToggleInfo.getPlanSponsorResponse.ReadFeaturesResponse.featureSet;
   			    			item.mappedFeatureset = [];
   			    			angular.forEach(item.summaryResponse,function(response){
   			    				var features = response.features;
   			    				var mappedFeatures = $scope.serialData.map(function (group) {
   									return {
   										enabled: findByKey(features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
   										name: group.name
   									};
   								});
   			    				mappedFeatures = $filter('orderBy')(mappedFeatures,'name');
   			    				item.mappedFeatureset.push(mappedFeatures);
   			    			});
   			    			$event.target.src = '../themes/css2/icons/minus.png';
   			    			$scope.$broadcast('controlExpandingEvent');
   			    		}

   			    		})
   			    	  
   			      }
   			      else if (data.code == 500){
   			    	
   			      }
   			      else if(data.getToggleInfo.getToggleLevelCode ==  555){
   			    	  
   			    	  
   			      }
   			
   			    })
   		    .catch(function (err) {
   		      
   		        console.log('failure response', err)
   		    })
   		    .finally(function () {
   		    	waitingDialog.hide();
   		    });
   		  }, 0);
    	
   		  
    		
    		
    		
    		
    		
    		
    		
	       	}else{
	       	}    	
    };
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
	    $scope.summaryObject = $stateParams.obj || JSON.parse(localStorage.getItem('summaryResponse'));
	    $scope.catFeatures=$scope.summaryObject.getCategoryFeaturesResponse.ReadCategoryFeaturesResponse; 
		$scope.psName = $scope.summaryObject.nameFull;
	    $scope.psuId = $scope.summaryObject.planSponsorId;
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
	 		return  obj[key] === value;
	 	})[0];
	 }
	 
	
	    
	    $scope.showFeature = function(selItemName, ind){
	    console.log('selected is ',selItemName);
	    if(selItemName == 'View All'){
		      $scope.viewAll = true;
		      $scope.showItems = 'View All';
		      var featureSets = $scope.myData;

			  $scope.viewAllCount = $scope.catFeatures.totalFeaturesCount;
		      $scope.selectedData = [];
		      $scope.serialData = [];
		      angular.forEach(featureSets, function (featureSet) {
		    	  var featureObjs= featureSet.features;
		    	  angular.forEach(featureObjs, function (featureObj) {
		    		  $scope.serialData.push(featureObj);
		    	  });
		    	});
		      
		      $scope.selectedData = $scope.serialData.map(function (group) {
					console.log('inside',group);
				return {
					resourceId: group.resourceId,
					enabled: findByKey($scope.toggleData[0].features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
					name: group.name
					
				};
			});
		      
		    $scope.selectedControlDataList = [];
		    $scope.controls = [];
		    for(var i=1; i<$scope.toggleData.length;i++){
		    	$scope.controls.push($scope.toggleData[i]);
		    	var selectedControlData = $scope.serialData.map(function(group){
		    		return{
		    			resourceId: group.resourceId,
						enabled: findByKey($scope.toggleData[i].features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
						name: group.name
		    		}
		    	});
		    	
		    	selectedControlData = $filter('orderBy')(selectedControlData,'name');
		    	$scope.selectedControlDataList.push(selectedControlData);
		    	
		    }
				
		      	$scope.selectedData = $filter('orderBy')($scope.selectedData,'name');
		      	angular.forEach($scope.controls, function(item){
		    			item.mappedFeatureset = [];
		    			angular.forEach(item.summaryResponse,function(response){
		    				var features = response.features;
		    				var mappedFeatures = $scope.serialData.map(function (group) {
								return {
									enabled: findByKey(features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
									name: group.name
								};
							});
		    				mappedFeatures = $filter('orderBy')(mappedFeatures,'name');
		    				item.mappedFeatureset.push(mappedFeatures);
		    			});
		    			//$event.target.src = '../themes/css2/icons/minus.png';
		    			$scope.$broadcast('controlExpandingEvent');

			    		})
		      
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
		        
		        $scope.selectedControlDataList = [];
		        $scope.controls = [];
			    for(var i=1; i<$scope.toggleData.length;i++){
			    	$scope.controls.push($scope.toggleData[i]);
			    	var selectedControlData = $scope.serialData.map(function(group){
			    		return{
			    			resourceId: group.resourceId,
							enabled: findByKey($scope.toggleData[i].features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
							name: group.name
			    		}
			    	});
			    	
			    	selectedControlData = $filter('orderBy')(selectedControlData,'name');
			    	$scope.selectedControlDataList.push(selectedControlData);
			    	
			    }
			    

		      	angular.forEach($scope.controls, function(item){
		    			item.mappedFeatureset = [];
		    			angular.forEach(item.summaryResponse,function(response){
		    				var features = response.features;
		    				var mappedFeatures = $scope.serialData.map(function (group) {
								return {
									enabled: findByKey(features , 'resourceId', group.featureIdentifier.resourceId, 'resourceName'),
									name: group.name
								};
							});
		    				mappedFeatures = $filter('orderBy')(mappedFeatures,'name');
		    				item.mappedFeatureset.push(mappedFeatures);
		    			});
		    			//$event.target.src = '../themes/css2/icons/minus.png';
		    			$scope.$broadcast('controlExpandingEvent');

			    		})
			    		
		        console.log('testdata',$scope.selectedData);
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
		        effecitveDate : "01/01/2018 to 12/31/2018" 
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
			$scope.controlData = [];
			$scope.totalNumberOfPage = Math.floor($scope.selectedData.length/$scope.columnPerPage);
			if (($scope.selectedData.length % $scope.columnPerPage) > 0){
				$scope.totalNumberOfPage = $scope.totalNumberOfPage + 1;
			}

			$scope.currentColumns = $scope.selectedData.slice($scope.columnPerPage*$scope.currentPage,Math.min($scope.selectedData.length, $scope.columnPerPage));
			for(var i = 0; i < $scope.selectedControlDataList.length; i++){
				
				var currentControlColumns = $scope.selectedControlDataList[i].slice($scope.columnPerPage*$scope.currentPage,Math.min($scope.selectedControlDataList[i].length, $scope.columnPerPage))
				$scope.controlData.push(currentControlColumns);
				console.log(currentControlColumns);
			
			}
			$scope.$on('categoryChangedEvent',function(){
				if($scope.isFirstPage){

					$scope.totalNumberOfPage = Math.floor($scope.selectedData.length/$scope.columnPerPage);
					if (($scope.selectedData.length % $scope.columnPerPage) > 0){
						$scope.totalNumberOfPage = $scope.totalNumberOfPage + 1;
					}
					
					$scope.currentPage = 0;
					$scope.currentColumns = [];
					$scope.controlData = [];
					for(var x=0; x<$scope.columnPerPage; x++){
						if($scope.selectedData[x]){
							$scope.currentColumns.push($scope.selectedData[x]);
						} else{
							$scope.currentColumns.push({name:""});
						}
					}
					for(var y = 0; y < $scope.selectedControlDataList.length; y++){
						var currentControl = $scope.selectedControlDataList[y];
						var currentControlColumns = [];
						for(var z = 0; z < $scope.columnPerPage; z++){
							if(currentControl[z]){
								currentControlColumns.push(currentControl[z]);
							} else{
								currentControlColumns.push({name:""});
							}
						}
						$scope.controlData.push(currentControlColumns);
						console.log($scope.controlData);
					}
					
					angular.forEach($scope.controls,function(control){
						if(control.summaryResponse){

							var paginatedFeatureSet = [];
							for(var l=0; l<control.mappedFeatureset.length;l++){
								var paginatedFeatures = [];
								for(var j = $scope.columnPerPage*$scope.currentPage; j < ($scope.columnPerPage*$scope.currentPage + $scope.columnPerPage); j++){
									if(control.mappedFeatureset[l][j]){
										paginatedFeatures.push(control.mappedFeatureset[l][j]);
									}
									else{
										paginatedFeatures.push({name:''});
									}
								}
								paginatedFeatureSet.push(paginatedFeatures);
							}
							control.paginatedFeatureSet = [];
							for(var b = 0; b <paginatedFeatureSet.length; b++){
								control.paginatedFeatureSet.push( paginatedFeatureSet[b]);
							}
							
						}
					});
				}
			});
			

			
			$scope.$on('controlExpandingEvent',function(){
				angular.forEach($scope.controls,function(control){
					if(control.summaryResponse){

						var paginatedFeatureSet = [];
						for(var l=0; l<control.mappedFeatureset.length;l++){
							var paginatedFeatures = [];
							for(var j = $scope.columnPerPage*$scope.currentPage; j < ($scope.columnPerPage*$scope.currentPage + $scope.columnPerPage); j++){
								if(control.mappedFeatureset[l][j]){
									paginatedFeatures.push(control.mappedFeatureset[l][j]);
								}
								else{
									paginatedFeatures.push({name:''});
								}
							}
							paginatedFeatureSet.push(paginatedFeatures);
						}
						control.paginatedFeatureSet = [];
						for(var b = 0; b <paginatedFeatureSet.length; b++){
							control.paginatedFeatureSet.push( paginatedFeatureSet[b]);
						}
						
					}
				});
			});
			
			$scope.next = function(){
				if ($scope.currentPage <= $scope.totalNumberOfPage -2){
					$scope.currentPage = $scope.currentPage +1 ;
					if ($scope.currentColumns.length > 0){
						
						while($scope.currentColumns.length > 0){
							$scope.currentColumns.pop();
						}
						
						$scope.currentColumns = [];
					}
					
				        for(var j = 0; j < $scope.controlData.length; j++){
						$scope.controlData[j] = [];
					}
					for (var i = $scope.columnPerPage*$scope.currentPage; 
									i < ($scope.columnPerPage*$scope.currentPage + $scope.columnPerPage); i++){
							if($scope.selectedData[i]){
								$scope.currentColumns.push($scope.selectedData[i]);
                            	for(j = 0; j < $scope.controlData.length; j++){
								$scope.controlData[j].push($scope.selectedControlDataList[j][i]);
							}
							} else{
								$scope.currentColumns.push({name:""});
                                for(j = 0; j < $scope.controlData.length; j++){
								$scope.controlData[j].push({name:""});
							}
							}
						}
					
					angular.forEach($scope.controls,function(control){
						if(control.summaryResponse){

							var paginatedFeatureSet = [];
							for(var l=0; l<control.mappedFeatureset.length;l++){
								var paginatedFeatures = [];
								for(var j = $scope.columnPerPage*$scope.currentPage; j < ($scope.columnPerPage*$scope.currentPage + $scope.columnPerPage); j++){
									if(control.mappedFeatureset[l][j]){
										paginatedFeatures.push(control.mappedFeatureset[l][j]);
									}
									else{
										paginatedFeatures.push({name:''});
									}
								}
								paginatedFeatureSet.push(paginatedFeatures);
							}
							control.paginatedFeatureSet = [];
							for(var b = 0; b <paginatedFeatureSet.length; b++){
								control.paginatedFeatureSet.push( paginatedFeatureSet[b]);
							}
							
						}
					});
					
				}
			}
			
			$scope.prev = function(){
				if($scope.currentPage >=1){
					$scope.currentPage = $scope.currentPage -1 ;
					if ($scope.currentColumns.length > 0){
						
						while($scope.currentColumns.length > 0){
							$scope.currentColumns.pop();
						}
						
						$scope.currentColumns = [];
					}
					for(var j = 0; j < $scope.controlData.length; j++){
						$scope.controlData[j] = [];
						}
					
					for (var i = $scope.columnPerPage*$scope.currentPage; i < $scope.columnPerPage*$scope.currentPage + $scope.columnPerPage ; i++){
						$scope.currentColumns.push($scope.selectedData[i]);
						for(j = 0; j < $scope.controlData.length; j++){
								$scope.controlData[j].push($scope.selectedControlDataList[j][i]);
							}
					}
					
					angular.forEach($scope.controls,function(control){
						if(control.summaryResponse){

							var paginatedFeatureSet = [];
							for(var l=0; l<control.mappedFeatureset.length;l++){
								var paginatedFeatures = [];
								for(var j = $scope.columnPerPage*$scope.currentPage; j < ($scope.columnPerPage*$scope.currentPage + $scope.columnPerPage); j++){
									if(control.mappedFeatureset[l][j]){
										paginatedFeatures.push(control.mappedFeatureset[l][j]);
									}
									else{
										paginatedFeatures.push({name:''});
									}
								}
								paginatedFeatureSet.push(paginatedFeatures);
							}
							control.paginatedFeatureSet = [];
							for(var b = 0; b <paginatedFeatureSet.length; b++){
								control.paginatedFeatureSet.push( paginatedFeatureSet[b]);
							}
							
						}
					});
					
				}
			}
			
		},
		templateUrl:'../script/planSummaryFeatureDetails.html'
	};
});

myapp.directive('summaryCategoryList',function(){
	return {
		restrict:'E',
		templateUrl:'../script/planSummaryCategoryList.html'
	}
});


myapp.directive('fsmStickyHeader', function(){
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            scrollBody: '@',
            scrollstop: '=',
            scrollableContainer: '=',
            contentOffset: '=',
			fsmZIndex: '='
        },
        link: function(scope, element, attributes, control){
            var content,
                header = $(element, this),
                clonedHeader = null,
                scrollableContainer = $(scope.scrollableContainer),
                contentOffset = scope.contentOffset || 0;

            var unbindScrollBodyWatcher = scope.$watch('scrollBody', function(newValue, oldValue) {
                content = $(scope.scrollBody);
                init();
                unbindScrollBodyWatcher();
            });

            if (scrollableContainer.length === 0){
                scrollableContainer = $(window);
            }

            function setColumnHeaderSizes() {
                if (clonedHeader.is('tr') || clonedHeader.is('thead')) {
                    var clonedColumns = clonedHeader.find('th');
                    header.find('th').each(function (index, column) {
                        var clonedColumn = $(clonedColumns[index]);
                        var finalWidthSet = column.offsetWidth / ($(window).innerWidth()-20)*100; // $(window) can be replace with a custom wrapper / container
                        clonedColumn.css('width',finalWidthSet + '%');
                    });
                }
            };

            function determineVisibility(){
                var scrollTop = scrollableContainer.scrollTop() + scope.scrollstop;
                var scrollLeft = -scrollableContainer.scrollLeft() + content.offset().left;
                var contentTop = content.offset().top + contentOffset;
                var contentBottom = contentTop + content.outerHeight(false);

                if ( (scrollTop > contentTop) && (scrollTop < contentBottom) ) {
                    if (!clonedHeader){
                        createClone();
                        clonedHeader.css({ "visibility": "visible"});
                    }

                    if ( scrollTop < contentBottom && scrollTop > contentBottom - clonedHeader.outerHeight(false) ){
                        var top = contentBottom - scrollTop + scope.scrollstop - clonedHeader.outerHeight(false);
                        clonedHeader.css('top', top + 'px');
                    } else {
                        calculateSize();
                    }
                    clonedHeader.css('left', scrollLeft + 'px');
                } else {
                    if (clonedHeader){
                        /*
                         * remove cloned element (switched places with original on creation)
                         */
                        header.remove();
                        header = clonedHeader;
                        clonedHeader = null;

                        header.removeClass('fsm-sticky-header');
                        header.css({
                            position: 'relative',
                            left: 0,
                            top: 0,
                            width: 'auto',
                            'z-index': 0,
                            visibility: 'visible'
                        });
                    }
                }
            };

            function calculateSize() {
                clonedHeader.css({
                    top: scope.scrollstop,
                    width: header.outerWidth(),
                    left: header.offset().left
                });

                setColumnHeaderSizes();
            };

            function createClone(){
                /*
                 * switch place with cloned element, to keep binding intact
                 */
                clonedHeader = header;
                header = clonedHeader.clone();
                clonedHeader.after(header);
                clonedHeader.addClass('fsm-sticky-header');
                clonedHeader.css({
                    position: 'fixed',
                    width: 'auto',
                    visibility: 'hidden'
                });
                calculateSize();
            };

            function init() {
                scrollableContainer.on('scroll.fsmStickyHeader', determineVisibility).trigger("scroll");
                scrollableContainer.on('resize.fsmStickyHeader', determineVisibility);

                scope.$on('$destroy', function () {
                    scrollableContainer.off('.fsmStickyHeader');
                });
            }
        }
    };
});

