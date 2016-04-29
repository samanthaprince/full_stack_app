module.exports = function(ChefApp) {
  ChefApp.factory('ResourceService', ['$http', 'AuthService', function($http, AuthService) {
    const mainRoute = 'http://localhost:3000/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function() {
      return $http.get(mainRoute + this.resourceName, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.update = function(data) {
      return $http.put(mainRoute + this.resourceName + '/' + data._id, data, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.delete = function(data) {
      return $http.delete(mainRoute + this.resourceName + '/' + data._id, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
