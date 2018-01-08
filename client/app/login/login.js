'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.factory('LoginService', ['$http', function($http) {
    return {
        login : function(username, password) {
            var auth = btoa(username + ':' + password);

            $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/login'
            });
        }
    }
}])

.controller('LoginCtrl', ['$scope', '$window', '$location', 'LoginService', function($scope, $window, $location, LoginService) {
    $scope.login = function() {
        LoginService.login($scope.username, $scope.password).then(function() {
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $location.path('/weather');
        }, function() {
            $scope.error = "Incorrect username/password";
        })
    };
}]);