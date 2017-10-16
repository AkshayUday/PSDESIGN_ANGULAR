myapp = angular.module('myApp', ['ngSanitize']);

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

      if(filterValues == 'ShowAll'){
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

myapp.controller('globalCtrl', function($scope, $http, $timeout) {
  $scope.myArrayData = [];
  $scope.showItems = 'ShowAll'

  $scope.show = function(selItemName) {
    $scope.showItems = selItemName;
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
    $scope.variable = !$scope.variable
  }

  $scope.counter = 0;
  $scope.change = function(obj, inx) {
    if (!obj.enabled) {
      $scope.showMessage = inx;
    }

  var Pdata = { name: obj.name, enabled: !obj.enabled, resourceId: obj.resourceId}



  // Show saving gif spinner.
  $scope.loading = true;
  $scope.inx1 = inx;

    // POST request :
$timeout(function () {$http({
  method: 'POST',
  url: 'updateGlobalFeatures',
  data: Pdata,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (data) {
      // Do stuff with data.
      console.log('success response', data)
    })
    .catch(function (err) {
      // Log error somehow.
        console.log('failure response', err)
    })
    .finally(function () {
      // Hide loading spinner whether our call succeeded or failed.
      console.log('checking whether loading is working')
      $scope.loading = false;
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
  $http.get("./categoryData.json").success(function(response) {
    console.log('response is ', response.ReadFeaturesResponse.features)
      $scope.myData = (response.ReadFeaturesResponse.features);
  });
});

