// Author: Erik Smith
// Date: February 1, 2017
// Description: File contains all of the services for the application,
// List of services: -authentication   -register   -newProductCtrl   -newProduct   -products   -deleteProduct
// DEV NOTE: WARNING, these API calls will cause a "cross-origin resource sharing" error if you do not have an extention to circumvate it!
//           This is innevitable on localhost machines. (i.e extentions https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)
/////////////////////////////////////////////////////

// Authentication API service
/////
App.factory('authentication',function ($http) {
  return function(Name,Password){
    var req = {
     method: 'POST',
     crossDomain: true,
     dataType: 'json',
     url: 'http://localhost:8080/api/authenticate',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: {"name": Name , "password" : Password}
    }
     return $http(req);
  }
})

// Registration API service
/////
.factory('register',function ($http) {
  return function(Name,Password){
    var req = {
     method: 'POST',
     crossDomain: true,
     dataType: 'json',
     url: 'http://localhost:8080/signup',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: {"name": Name , "password" : Password}
    }
     return $http(req);
  }
})

// NewProduct API service
/////
.factory('newProduct',function ($http) {
  return function(Name,Description,Token){
    var req = {
     method: 'POST',
     crossDomain: true,
     dataType: 'json',
     url: 'http://localhost:8080/api/newProduct',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: {"name": Name , "description" : Description, "token" : Token}
    }
     return $http(req);
  }
})

// Products API service
/////
.factory('products',function ($http) {
  return function(Token){
    var req = {
     method: 'POST',
     crossDomain: true,
     dataType: 'json',
     url: 'http://localhost:8080/api/products',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: {"token" : Token}
    }
     return $http(req);
  }
})

// Delete P:roduct API service
/////
.factory('deleteProduct',function ($http) {
  return function(token,id){
    var req = {
     method: 'POST',
     crossDomain: true,
     dataType: 'json',
     url: 'http://localhost:8080/api/deleteProduct',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: {"token" : token , "id": id}
    }
     return $http(req);
  }
})