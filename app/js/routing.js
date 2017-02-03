// Author: Erik Smith
// Date: February 1, 2017
// Description: File contains all of the configurations for the application and links the page to the proper controllers
/////////////////////////////////////////////////////

App.config(function ($routeProvider) {
  $routeProvider.
      when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'}).
      when('/register', {templateUrl: 'partials/register.html', controller: 'registerCtrl'}).
      when('/new-product', {templateUrl: 'partials/new-product.html', controller: 'newProductCtrl'}).
      when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'}).
      when('/products', {templateUrl: 'partials/products.html', controller: 'productsCtrl'}).
      otherwise({redirectTo: '/home'});
})