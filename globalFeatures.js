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
        url: "#",
        templateUrl: '../script/planSponsor.html',
        controller: "planCtrl"
      }
    }]

   myapp.config(function($stateProvider, $urlRouterProvider) {

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
          var key = item.featureCategory[keyname];
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

//myapp.controller('planCtrl',['$scope', '$http', '$timeout', '$window', function($scope, $http, $timeout, $window) {
//               alert("load this");               
//
//                            }]);


myapp.directive('statusPopover', function($compile,$timeout) {
    return {
        restrict: 'A',
        controller: function($scope){
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
	        	return converted;
	           };
	          $scope.statusChanged = function(currentValue){
	        	  if($scope.getFeatures.status == currentValue){
	        		  $scope.isStatusChanged = true;
	        	  }
	        	  else{
	        		  $scope.isStatusChanged = false;
	        	  }
	          }
        	 $scope.setStatus =function(feature,$event){
        		// hide all other popovers                 
        		 angular.element('.status-column button').not($event.target).popover('hide');
        		 $scope.isStatusChanged = true;
        		 $scope.getFeatures = feature;
        		 $scope.statusOptions = {};
        		 $scope.statusOptions.status = feature.status;        		
        		 if(feature.status == 'Scheduled offline'){
        		 $scope.displaySOMessage = feature.statusMessage;
        		 $scope.datetimeBegin = $scope.convertDate(feature.scheduledPeriod.datetimeBegin);
        		 $scope.datetimeEnd =  $scope.convertDate(feature.scheduledPeriod.datetimeEnd);
        		 $scope.startTime = moment($scope.datetimeBegin).format('MM/DD/YYYY hh:mm A');
        		 $scope.endTime = moment($scope.datetimeEnd).format('MM/DD/YYYY hh:mm A');
        		
	        		 if(angular.element('.start-date').hasClass('ng-pristine')){
	        			// angular.element('.start-date').data("DateTimePicker").setDate($scope.startTime);        			
	        			 }
	        		// if(angular.element('.end-date').hasClass('ng-pristine')){angular.element('.end-date').data("DateTimePicker").setDate($scope.endTime); }       		         		 
        		 }
        		 else if(feature.status == 'Temporary offline'){
        			 $scope.displayTOMessage = feature.statusMessage;
        		 }
        	 };
        		        	  
        		        	
	  
        		        	
//        	  $scope.saveStatus = function(){
//        		  var datetimeStart = $('.start-input').val();
//        		  var datetimeEnd = $('.end-input').val();
//        		  if(Date.parse(datetimeStart) < Date.parse(datetimeEnd)){
//        			   //start is less than End
//        			 $scope.startTimeError = true;
//        			}else{
//        			   //end is less than start
//        				alert("no");
//        			}
//        	  }
        	 
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
             $('.collapsiblock').not(this)
             element.popover(options);
             scope.cancel = function() {
            	 element.popover('hide');
            	 element.triggerHandler('click');
            	 element.attr('disabled', false);
             }

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
