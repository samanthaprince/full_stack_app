module.exports = function (app) {
  app.factory('AuthService', ['$http', '$window',
  function($http, $window) {
    var token;
    var url = 'http://localhost:3000';
    var auth = {
      createChef(chef, cb) {
        cb || function() {};
        $http.post(url + '/signUp', chef)
          .then((res) => {
            token = $window.localStorage.token = res.data.token;
            cb(null, res);
          }, (err) => {
            cb(err);
          });
      },
      getToken() {
        return token || $window.localStorage.token;
      },

      signOut(cb) {
        token = null;
        $window.localStorage.token = null;
        if (cb) cb ();
      },

      signIn(chef, cb) {
        cb || function() {
          $http.get(url + '/signin', {
            headers: {
              authorization: 'Basic ' + btoa(chef.name + ':' + chef.password)
            }
          }).then((res) => {
            token = $window.localStorage.token = res.data.token;
            cb(null, res);
          }, (err) => {
            cb(err);
          });
        };
      },

      signUp(chef, cb) {
        console.log(chef);
        cb || function() {
          $http.post(url + '/signup', {
            headers: {
              authorization: 'Basic ' + btoa(chef.name + ':' + chef.password)
            }
          }).then((res) => {
            token = $window.localStorage.token = res.data.token;
            cb(null, res);
          }, (err) => {
            cb(err);
          });
        };
      }
    };

    return auth;

  }]);
};
