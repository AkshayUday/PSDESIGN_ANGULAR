
myapp = angular.module('myApp', ['ngSanitize','ui.router']);

var states = [
//              {
//      name: 'HOME',
//      state: {
//        url: "/",
//        templateUrl: 'script/feature.html',
//        controller: "globalCtrl"
//      }
//    },
   
    {
      name: 'FEATURES',
      state: {
        url: "/",
        templateUrl: '../script/feature.html',
        controller: "globalCtrl"
      }
    },
    {
      name: 'PLANSPONSOR',
      state: {
        url: "/ps",
        templateUrl: '../script/planSponsorHome.html',
        controller: function($state){
        	$state.go('PLANSPONSOR.SPONSOR');
        }
      }
    },
    {
        name: 'PLANSPONSOR.SPONSOR',
        state: {
          url: "/sponsor",
          templateUrl: '../script/planSponsor.html',
          controller: "planCtrl",params:{source:null}
        }
      },
   { 
        name: 'PLANSPONSOR.SUMMARY',
        
      state: {
         url: "/summary",
         templateUrl: '../script/planSummary.html',
         controller: "summaryCtrl",params:{obj:null}
        }
     }
    ]

   myapp.config(function($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.when('/ps', '/ps/sponsor');	 
	  $urlRouterProvider.otherwise('/');
      angular.forEach(states, function(state) {
     $stateProvider.state(state.name, state.state);
   });
 });

// here we define our unique filter
myapp.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [],
          keys = [],
          i =0;

      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
    	  if(item.featureCategory){
          var key = item.featureCategory[keyname];
    	  }
    	  else{
    		  var key = item.category[keyname];
    	  }
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key);
              // push this item to our final output array
              output.push(item);
          }
      });
    //  console.log('output is', output)
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});

myapp.filter('myFilter', function () {
    return function(inputs,filterValues) {
      var output = [];

      if(filterValues == 'View All'){
          output = inputs;
          return output;
      }else{
        angular.forEach(inputs, function (input) {
          if (filterValues.indexOf(input.featureCategory.categoryName) !== -1)
              output.push(input);
         });
         return output;
      }


   };
});




myapp.controller('globalCtrl',['$scope', '$http', '$timeout', '$window', function($scope, $http, $timeout, $window) {
	$scope.title = 'GlobalFeatures';
	if(!$window.cardData){
		$scope.isDataAvailable = false;
	}
	else{
	$scope.isDataAvailable = true;	
	$scope.resData = ($window.cardData.ReadFeaturesResponse.feature);
	$('.home-state a').removeClass('.active');
	$('.feature-state a').addClass('.active');
      $scope.myData = $scope.resData;
	
  $scope.myArrayData = [];
  $scope.showItems = 'View All';
  $scope.showPopover=false;
  $scope.expand=false;
  $scope.selected = 'View All';
  $scope.viewAll = true;
  $scope.categorydescription = 'View All';
  $scope.errormessage = ''
	  $scope.closeError = function($event){
      $scope.toggleFailure = false;
      $event.stopPropagation();
       }

  

  
  
  $scope.show = function(selItemName,ind) {
    // $scope.viewAll = false;
console.log('selected is ',selItemName);
    if(selItemName == 'View All'){
      $scope.viewAll = true;
      $scope.showItems = 'View All';
      $scope.myData = $scope.resData;
      $scope.categorydescription = 'View All';
       $scope.selected = ind;
    }else{
      $scope.viewAll = false;
      $scope.showItems = selItemName.featureCategory.categoryName;
       $scope.categorydescription = selItemName.featureCategory.categoryDescription;
       $scope.selected = ind;
    }
    $window.scrollTo(0, angular.element('.shadow-box').offsetTop);

  }
  
  

  $scope.test = function(v) {

    if (!v) {
      return 'toggle btn btn-default off';
    } else {
      {
        return 'toggle btn btn-primary';
      }
    }

  };
  $scope.toggle = function(id, dat) {
    $scope.variable = !$scope.variable;
  }

  $scope.counter = 0;
  $scope.toggleSuccess =false;
  $scope.toggleFailure = false;
  
  $scope.change = function(obj, inx, showingitems,$event) {
	  //$scope.close();
	  angular.element('.popover.in').popover('hide');
	    $scope.showMessage = inx;
	    $scope.showingitems = showingitems;
	    $scope.currentEnabled = obj.enabled;
  //  if (!obj.enabled) {
  //    $scope.showMessage = inx;
    //}

  var Pdata = { name: obj.name, enabled: !obj.enabled, resourceId: obj.featureIdentifier.
		  resourceId}


  // Show saving gif spinner and msg part. 
  $scope.loading = true;
  $scope.msgtimeout = true;
  $scope.inx1 = inx;

    // POST request :
  $timeout(function () {$http({
	  method: 'POST',
	  url: 'updateGlobalFeatures',
	 data: JSON.stringify(Pdata)
	  //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		//alert(data);
		// Do stuff with data.
	      console.log('success response', data);
	    
	      if(data.code == 200){
	    	  $scope.toggleSuccess =true;
	    	  obj.scheduledPeriod =[];
		      
	    	  obj.status=data.status; 
	      }
	      else if (data.code == 500){
	    	  $scope.toggleFailure = true;
	    	  $scope.exceptionMsg = data.errorMsg;
	    	  $scope.showException = false;
	    	  // console.log('500',data.errorMsg);
	    	  if($scope.currentEnabled == false){
	    	  obj.enabled =false;
	    	  }
	    	  else{obj.enabled = true;}
    	 
	      }
	      else{
	    	  $scope.toggleFailure = true;
	    	  $scope.exceptionMsg = data.errorMsg;
	    	  $scope.showException = false;	  
	    	  //obj.enabled =!obj.enabled;
	    	  if($scope.currentEnabled == false){
		    	  obj.enabled =false;
		    	  }
	    	  else{obj.enabled = true;}
	    	  console.log('500',data.errorMsg);
	    	  $event.stopPropagation();
	    	  $event.preventDefault();
	    	  
	      }
	
	    })
    .catch(function (err) {
      // Log error somehow.
    	obj.enabled =!obj.enabled;
        console.log('failure response', err)
    })
    .finally(function () {
      // Hide loading spinner whether our call succeeded or failed.
      console.log('checking whether loading is working')
      $scope.loading = false;
     
    // $timeout(function(){
    // $scope.msgtimeout = false;
   //  $scope.toggleSuccess = false;
     //$scope.toggleFailure = false;
     // },4000);
    });
  }, 2000);

  
   

  
  
  
  
  
  
  
  
  


//
// .then(function successCallback(response) {
//   console.log('success response', response)
//     // this callback will be called asynchronously
//     // when the response is available
//
//   }, function errorCallback(response) {
//     console.log('failure response', response.status)
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });

    console.log('changed1', obj.enabled);
  };

  $scope.stateChanged = function(qId) {
    if ($scope.myData[qId]) { //If it is checked
      alert('test');
    }
  }
}
 // $http.get("script/data.json").success(function(response) {
   // console.log('response is ', response.ReadFeaturesResponse.features)
   // $scope.resData = response.ReadFeaturesResponse.features;
   //   $scope.myData = $scope.resData;
 // });
}]);




myapp.directive('statusPopover', function($compile,$timeout) {
    return {
        restrict: 'A',
        controller: function($scope,$http){
//        	 var convertTimezone = function(date){
//       		  var newDate = new Date(date.setTime(date.getTime() + (date.getTimezoneOffset() * 60000)));
//       		  var offset = date.getTimezoneOffset()/60;
//       		  var hours = date.getHours();
//       		  newDate.setHours(hours - offset);
//       		  return newDate;
//       	  };
        	 
        	$scope.hideCalendar = function(typeOfCal){
	
     		 	if(typeOfCal == 'from'){
      		 		angular.element('.end-date').data("DateTimePicker").hide();      	        	    	        	
      		 	}
      		 	else if(typeOfCal == 'to'){
      		 		angular.element('.start-date').data("DateTimePicker").hide();
      		    	 	}
      	           };
	           $scope.convertDate = function(givenDate){      	        	
	        	var dateSet = givenDate.split(/[^0-9]/);
	        	var converted =new Date (dateSet[0],dateSet[1]-1,dateSet[2],dateSet[3],dateSet[4]);
	        	var changedDate = moment(converted).format('MM/DD/YYYY hh:mm A')
	        	return changedDate;
	           };
	          $scope.statusChanged = function(currentValue){
	        	  $scope.showStatusError = false;
	        	  $scope.errMessage = '';
	        	  if($scope.getFeatures.status == currentValue){
	        		  $scope.isStatusChanged = true;	        		 
	        	  }
	        	  else{
	        		  $scope.isStatusChanged = false;
	        	  }
	        	  if(currentValue =='Scheduled offline'){
	        		  if($scope.getFeatures.scheduledPeriod){
	        			  !$scope.getFeatures.scheduledPeriod.datetimeBegin ? ($scope.startTime = $scope.endTime = $scope.displaySOMessage  =  null) : '' ;
	        		  	}
	        	  }
	        	  else if(currentValue =='Temporary offline'){
	        		  if((!$scope.getFeatures.statusMessage) ){
	        			  $scope.displayTOMessage  =  null;
	        		  }
	        		  else if($scope.getFeatures.statusMessage && $scope.getFeatures.scheduledPeriod)
	        			  {
	        			  	$scope.getFeatures.scheduledPeriod.datetimeBegin ? $scope.displayTOMessage  =  null : '';
	        			  }
	        	  }
	        	 };
	          $scope.saveStatus = function(){
        		  var newStatus = $scope.statusOptions.status;
        		  var enabled = $scope.getFeatures.enabled;
        		  var featurename= $scope.getFeatures.name;
        		  var resourceId =$scope.getFeatures.featureIdentifier.resourceId;    		 
          		  var statusPost = { name: featurename, status: newStatus, enabled: enabled, resourceId: resourceId };
        		  if(newStatus == 'Scheduled offline'){
        			  var datetimeStart = angular.element('.start-input').val();
            		  var datetimeEnd = angular.element('.end-input').val();
        			  statusPost.startTime = datetimeStart;
        			  statusPost.endTime = datetimeEnd;
        		  }
        		   $scope.errMessage = '';
        		   $scope.showStatusError = false;
        		   //Empty field Validation
        		  if ( newStatus == 'Scheduled offline' && (!datetimeStart || !datetimeEnd)){
        			  if(datetimeStart  == ''){ $scope.errMessage = 'Start date / time cannot be empty.';}
        			  else if(datetimeEnd == ''){$scope.errMessage = 'End date / time cannot be empty.';}        			  
        		  }
        		  else{
        			  // POST request :
        			$scope.statusLoading = true;
              		$http({
              		method: 'POST',
              		url: 'updateStatus',
              		data: JSON.stringify(statusPost),
              		//headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              		}).success(function (data) {
              		    // Do stuff with data.
              		    console.log('success response', data);
              		    if(data.code == 200){
              		    	$scope.getFeatures.status = data.status;
              		    	$scope.getFeatures.scheduledPeriod ={};
              		    	$scope.startTime = $scope.endTime = $scope.displaySOMessage = $scope.displayTOMessage =  null;
              		    	 $scope.cancel ();
              		    	if(data.status == 'Temporary offline'){
              		    		$scope.getFeatures.statusMessage = $scope.displayTOMessage = data.message;
              		    		}
              		    	if(data.status == 'Scheduled offline'){
              		    		$scope.getFeatures.statusMessage = $scope.displaySOMessage = data.message;
              		    		$scope.getFeatures.scheduledPeriod.datetimeBegin = data.datetimeBegin;
              		    		$scope.getFeatures.scheduledPeriod.datetimeEnd = data.datetimeEnd;
              		    		$scope.startTime = $scope.convertDate(data.datetimeBegin);
              		    		$scope.endTime = $scope.convertDate(data.datetimeEnd);              		    		
              		    	}
              		    	
              		    	
              		    }
              		    else if(data.code == 555){ 
              		    	$scope.showStatusError = true;
              		    	$scope.statusException = data.errorMessage;
              		    	
              		    }
              		    else {
              		    	$scope.showStatusError = true;
              		    	$scope.statusException = "Sorry! We are unable to save the status change request currently. Please contact the support service, if the problem persists.";
              		    }
              		  })
              		  .catch(function (err) {
              		    // Log error somehow.
              		      console.log('failure response', err);
              		  })
              		  .finally(function () {
              			$scope.statusLoading = false;
              		    console.log('test');
              		  });
        		  console.log('3',datetimeStart)
        		  }
        		  
              
        		

//        		  if(Date.parse(datetimeStart) < Date.parse(datetimeEnd)){
//        			   //start is less than End
//        			 $scope.startTimeError = true;
//        			}else{
//        			   //end is less than start
//        				alert("no");
//        			}
        		  
        		  
        	  };
        	 $scope.setStatus =function(feature,$event){
        		// hide all other popovers                 
        		 angular.element('.status-column button').not($event.target).popover('hide');
        		 
        		 $scope.isStatusChanged = true;
        		 $scope.showStatusError = false;
        		 $scope.errMessage = '';
        		 $scope.getFeatures = feature;
        		 $scope.statusOptions = {};
        		 $scope.statusOptions.status = feature.status;        		
        		 if(feature.status == 'Scheduled offline'){
        		 $scope.displaySOMessage = feature.statusMessage;
        		 $scope.startTime = $scope.convertDate(feature.scheduledPeriod.datetimeBegin);
        		 $scope.endTime = $scope.convertDate(feature.scheduledPeriod.datetimeEnd);
        		 
        		
	        		 if(angular.element('.start-date').hasClass('ng-pristine')){
	        			angular.element('.start-date').data("DateTimePicker").setDate($scope.startTime);        			
	        			 }
	        		if(angular.element('.end-date').hasClass('ng-pristine')){angular.element('.end-date').data("DateTimePicker").setDate($scope.endTime); }       		         		 
        		 }
        		 else if(feature.status == 'Temporary offline'){
        			 $scope.displayTOMessage = feature.statusMessage;
        		 }
        		// angular.element($event.target).popover('show');
        	 };
        		        	  
        		        	
	  
        		        	
        	 
        	 
        },
        link: function(scope, element, attrs) {
        	 
        	 var content = $(".popover-content").html();
             var compiledContent = $compile(content)(scope);
             var options = {
                 content: compiledContent,
                 html: true,
                 placement: function(context, src) {
             		$(context).addClass('size');
             		return 'bottom';
             	}
             };
             element.popover(options);
             scope.cancel = function() {
            	 element.popover('hide');
            	// e.stopPropagation();            	 
            	// element.triggerHandler('click');
            	 element.attr('disabled', false);
             }
             element.on('hidden.bs.popover', function (e) {
            	 element.data("bs.popover").inState = { click: false, hover: false, focus: false }
             });

        }
      };
    });
myapp.directive('scrollOnClick', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, $elm) {
	      $elm.on('click', function() {

	         $("html, body").stop().animate({scrollTop: $elm.offset().top}, "slow");

	      });
	    }
	  }
	});
myapp.directive('datePicker', function($compile) {
    return {
    	restrict: 'A',
    	scope: {
    	    setDateObj: '=ngModel'
    	  },
    	  
    	
        link: function(scope, elem, attrs, ngModel) {
        	
        	
        	if(elem.hasClass(".start-date")){
        		scope.setDateObj = scope.startTime;
        		
        	}
        	else if(elem.hasClass(".end-date")){
        		scope.setDateObj = scope.endTime;
        		
        	}
        	
        	elem.datetimepicker({
        		defaultDate:scope.setDateObj,
        		autoclose:true,
        	});
        
        	elem.on('dp.hide', function(e) {
        		//elem.data("DateTimePicker").options();
        		//widget.find('.picker-switch.accordion-toggle').click();
        	});
        }
      };
    });
