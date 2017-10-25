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
        templateUrl: 'script/feature.html',
        controller: "globalCtrl"
      }
    },
    {
      name: 'PLANSPONSOR',
      state: {
        url: "#",
        templateUrl: 'script/planSponsor.html',
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
  $scope.change = function(obj, inx) {
	  $scope.showMessage = inx;
	  
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
        	 $scope.setStatus =function(feature){
        		 //var setFeatureStatus = JSON.stringify(feature.status);
        		  $scope.statusoptions = feature.status;
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
             	//}
             	}
             };
             element.popover(options);
             $('html').off('click', function(e) {
            	  if (typeof $(e.target).data('original-title') == 'undefined' &&
            	     !$(e.target).parents().is('.popover.in')) {
            	    $('[data-original-title]').popover('hide');
            	  }
             });

        }
      };
    });
