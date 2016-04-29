'use strict';
const angular = require('angular');

require('angular-route');

const app = angular.module('ChefApp', ['ngRoute']);

require('./services/http_service')(app);
require('./directives/directives')(app);
require('./services/error_service')(app);
require('./services/auth_service')(app);

app.controller('ChefController', ['$http', '$location', 'AuthService', 'ErrorService', 'ResourceService',
function($http, $location, AuthService, ErrorService, ResourceService) {

  const vm = this;
  const chefResource = ResourceService('chefs');

  vm.chefs = ['chef'];

  vm.name = 'bob';

  vm.getChefs = function() {
    chefResource.getAll()
    .then((result) => {
      vm.chefs = result.data.data;
    }, function (error) {
      console.log(error);
    });
  };
  vm.createChef = function(chef) {
    chefResource.post(chef)
    .then((res) => {
      vm.chefs.push(res.data);
      vm.newChef = {};
    });
  };

  vm.updateChef = function(chef) {
    chefResource.put(chef)
    .catch((err) => {
      console.log(err);
    });
    vm.updateChef.displayed = null;
  };

  vm.resetChef = function(chef) {
    chefResource.get()
    .then((res) => {
      vm.chefs[vm.chefs.indexOf(chef)] = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  };

  vm.removeChef = function(chef) {
    chefResource.delete()
    .then(() => {
      vm.chefs = vm.chefs.filter((c) => c._id != chef._id);
    });

  };
  vm.signUp = function(chef) {
    console.log('chef');
    AuthService.signUp(chef);
  };
}]);

app.controller('RecipeController', ['$http', 'ResourceService',
function($http, ResourceService) {

  const recipeResource = ResourceService('recipes');
  const vm = this;

  vm.recipes = ['recipe'];

  vm.getRecipes = function() {
    recipeResource.getAll()
    .then((result) => {
      vm.recipes = result.data.data;
    }, function (error) {
      console.log(error);

    });
  };
  vm.createRecipe = function(recipe) {
    recipeResource.post(recipe)
    .then((res) => {
      vm.recipes.push(res.data);
      vm.newRecipe = {};
    });
  };

  vm.updateRecipe = function(recipe) {
    recipeResource.put(recipe)
    .catch((err) => {
      console.log(err);
    });
    vm.updateRecipe.displayed = null;
  };

  vm.resetRecipe = function(recipe) {
    recipeResource.get()
      .then((res) => {
        vm.recipes[vm.recipes.indexOf(recipe)] = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  vm.removeRecipe = function(recipe) {
    recipeResource.delete()
    .then(() => {
      vm.recipes = vm.recipes.filter((r) => r._id != recipe._id);
    });
  };

}]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/signup', {
    controller: 'ChefController',
    controllerAs: 'chefctrl',
    templateUrl: '/views/signUp.html'
  })
  .when('/signin', {
    controller: 'ChefController',
    controllerAs: 'chefctrl',
    templateUrl: '/views/signIn.html'
  })
  .when('/home', {
    controller: 'ChefController',
    controllerAs: 'chefctrl',
    templateUrl: '/views/home.html'
  });
}]);
