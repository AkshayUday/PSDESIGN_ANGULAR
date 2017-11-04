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
        controller: "globalCtrl"
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
      console.log('output is', output)
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




myapp.controller('globalCtrl', function($scope, $http, $timeout, $window) {
	
	
	
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
 /* $scope.toggleSuccess =false;
  $scope.toggleFailure = false;*/
  $scope.change = function(obj, inx, showingitems) {
	    $scope.showMessage = inx;
	    $scope.showingitems = showingitems
	  
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
	      /*if(data.UpdateFeatureResponse.updateStatus == 'SUCCESS'){
	    	  $scope.toggleSuccess =true;
	      }
	      else{
	    	  $scope.toggleFailure = true;
	      }*/
	    })
    .catch(function (err) {
      // Log error somehow.
        console.log('failure response', err)
    })
    .finally(function () {
      // Hide loading spinner whether our call succeeded or failed.
      console.log('checking whether loading is working')
      $scope.loading = false;
      $timeout(function(){
    	  $scope.msgtimeout = false;
      },4000);
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
 // $http.get("script/data.json").success(function(response) {
   // console.log('response is ', response.ReadFeaturesResponse.features)
   // $scope.resData = response.ReadFeaturesResponse.features;
   //   $scope.myData = $scope.resData;
 // });
});



myapp.directive('statusPopover', function($compile) {
    return {
        restrict: 'A',
//        transclude: false,
//        scope: {},
        controller: function($scope){
//        	 var convertTimezone = function(date){
//       		  var newDate = new Date(date.setTime(date.getTime() + (date.getTimezoneOffset() * 60000)));
//       		  var offset = date.getTimezoneOffset()/60;
//       		  var hours = date.getHours();
//       		  newDate.setHours(hours - offset);
//       		  return newDate;
//       	  };
        	 $scope.setStatus =function(feature){
        		 $scope.statusOptions = {};
        		 $scope.statusOptions.status = feature.status;
        		// $scope.startTime = moment(feature.scheduledPeriod.datetimeBegin,'YYYY-MM-DD HH.mm.ss.SSSSSS').format();
        		// $scope.endTime = moment(feature.scheduledPeriod.datetimeEnd,'YYYY-MM-DD HH.mm.ss.SSSSSS').format('MMMM Do YYYY, h:mm:ss a');
        		 $scope.startTime =new Date(feature.scheduledPeriod.datetimeBegin);
        		 $scope.endTime = new Date(feature.scheduledPeriod.datetimeEnd);
        		 $scope.startMessage = moment($scope.startTime).format('MM/DD/YYYY hh:mm A');
        		 $scope.endMessage = moment($scope.endTime).format('MM/DD/YYYY hh:mm A');
        		 //var isoDate = new Date('yourdatehere').toISOString();
        		 //$('.datepicker1').data("DateTimePicker").date(feature.scheduledPeriod.datetimeBegin);
        	  };
        	  $scope.saveStatus = function(){
        		  var datetimeStart = $('.start-input').val();
        		  var datetimeEnd = $('.end-input').val();
        		  if(Date.parse(datetimeStart) < Date.parse(datetimeEnd)){
        			   //start is less than End
        			  alert("yes");
        			}else{
        			   //end is less than start
        				alert("no");
        			}
        	  }
        	 
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
            	 element.triggerHandler('click');
            	 element.attr('disabled', false);
             }

        }
      };
    });
myapp.directive('datePicker', function($compile) {
    return {
    	restrict: 'A',
    	scope: {
    	    setDateObj: '=ngModel'
    	  },
    	
        link: function(scope, elem, attrs, ngModel) {
        	
        	
//        	var datecontent = $(".datepicker1").html();
//            var datecompiledContent = $compile(datecontent)(scope);
//            var dateoptions = {
//                content: datecompiledContent,
//                orientation: "auto",
//                todayHighlight: true,
//                format: 'mm/dd/yy',
//                autoclose: true
//            	
//            };
//            elem.datepicker(dateoptions);
//            console.log("executed");
        	//elem.data("DatePicker").date(scope.setDate);
        	//scope.setDate = $filter('date')(scope.setDate, "dd/MM/yyyy");
//        	scope.setDateFormatted = new Date(scope.setDate);
        	if(elem.hasClass(".start-date")){
        		scope.setDateObj = scope.startTime;
        	}
        	else if(elem.hasClass(".end-date")){
        		scope.setDateObj = scope.endTime;
        	}
        	elem.datetimepicker({
        		defaultDate:scope.setDateObj,
        		autoclose:true,
        		
  
        		
        	      
//        		change:function (date) {
//
//                    // Triggers a digest to update your model
//                    scope.$apply(function () {
//                        ngModelCtrl.$setViewValue(date);
//                    });
//
//                }
        	});
        	
        }
      };
    });
