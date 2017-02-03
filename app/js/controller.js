// Author: Erik Smith
// Date: February 1, 2017
// Description: File contains all of the controllers for the application,
// List of controllers: -loginCtrl   -productsCtrl   -newProductCtrl   -registerCtrl   -HomeCtrl   -IndexCtrl
/////////////////////////////////////////////////////


//
// Login Controller
//////////
App.controller('loginCtrl', ['$scope', 'authentication','$window', function ($scope, authentication, $window) {
  //Login action that will set the name and token to the window session.
  $scope.login = function (name,password) {

    //Call to Authentication service (see services.js)
    authentication(name,password).success(function (data) {

      //Successfull call
      if(data.success){

        //Store variables to session and redirect
        $window.localStorage.setItem("token", data.token);
        $window.localStorage.setItem("name", data.name);
        $window.location.href = "/";
      }
      else{

        //authentication failed, display the error
        $scope.error = data.message
      }
    });
  };
}])

//
// Products Controller
//////////
.controller('productsCtrl', ['$scope',  'products','deleteProduct','$window',function ($scope, products, deleteProduct, $window) {
  // is the user logged in?
  if($window.localStorage.getItem("token")){

    //Call to products service (see services.js)
    products($window.localStorage.getItem("token")).success(function (data) {

      //successfull call, save product list to local variable scope
      if(data.success){
        $scope.productsList = data.message;
      }
      else{
        //authentication failed, redirect to login page
        $window.location.href = "#/login";
      }
    });
  }else{

    //authentication failed, redirect to login page
    $window.location.href = "#/login";
  }

  $scope.deleteProductAction = function (deleteId) {
    // is the user logged in?
    if($window.localStorage.getItem("token")){

      //Reset messages
      $scope.successMessage = undefined;
      $scope.errorMessage = undefined;

      //Call to deleteProduct service (see services.js)
      deleteProduct($window.localStorage.getItem("token"),deleteId).success(function (data) {

        //Successfull call
        if(data.success){
          $scope.successMessage = data.message;
          $scope.productsList = $scope.removeFromProductList($scope.productsList,deleteId);
        }
        else{
          //failed call, display error
          $scope.errorMessage = data.message;
        }
      });
    }else{
      //failed authentication, redirect to login page
      $window.location.href = "#/login";
    }
  };

  // Function deletes the item inside the provided array with a matching id
  /////////
  $scope.removeFromProductList = function(array,id){
      for(var i = array.length - 1; i >= 0; i--){
          if(array[i]._id == id){
              array.splice(i,1);
          }
      }
      return array;
  }
  /////////end function

}])

//
// New-Product Controller
//////////
.controller('newProductCtrl', ['$scope', 'authentication','newProduct', '$window', function ($scope, authentication,newProduct, $window) {
  // is the user logged in?
  if($window.localStorage.getItem("token")){

    //New product action button event listener
    $scope.newProductAction = function (name,description) {

      //Call to newProduct service (see services.js)
      newProduct(name,description,$window.localStorage.getItem("token")).success(function (data) {

        //Successfull call and redirect
        if(data.success){
          $window.location.href = "#/products";
        }
        else{
          //failed authentication // maybe expired token
          $window.location.href = "#/login";
        }
      });
    };
  }else{
    //failed authentication
    $window.location.href = "#/login";
  }
}])

//
// Register Controller
//////////
.controller('registerCtrl',[ "$scope", "register",'$window', function ($scope,register, $window) {
  $scope.registerAction = function (name,password) {

    //Call to register service (see services.js)
    register(name,password).success(function (data) {

      //Successfull call
      if(data.success){

        //Store variables to session and redirect
        $window.localStorage.setItem("token", data.token);
        $window.localStorage.setItem("name", data.name);
        $window.location.href = "/";
      }
      else{
        //registration error display
        $scope.error = data.message
      }
    });
  };
}])

//
// Home Controller
//////////
.controller('HomeCtrl',['$scope', '$window', function ($scope,$window) {

}])

//
// Master index Controller
//////////
.controller('IndexCtrl',['$scope', '$window', function ($scope,$window) {

    //Get the name to display on the sidebar
    if($window.localStorage.getItem("name")){
      $scope.name = $window.localStorage.getItem("name");
    }

    //Logout Action for sidebar button
    $scope.logout = function () {

      //Remove variables from session and redirect
      $window.localStorage.removeItem("token");
      $window.localStorage.removeItem("name");
      $window.location.href = "/";
    };
}])
