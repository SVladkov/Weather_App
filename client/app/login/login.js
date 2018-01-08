'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.factory('LoginService', ['$http', function($http) {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;

    return {
        login : function(username, password) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/login'
            }).then(function successCallback(response) {
                console.log('successs');
            }, function errorCallback(response) {
                console.log(response);
                console.log('an error occured');
            })
            //isAuthenticated = username === admin && password === pass;
            //return isAuthenticated;
        },
        isAuthenticated : function() {
            return isAuthenticated;
        }
    }
}])

.controller('LoginCtrl', ['$scope', '$window', '$location', 'LoginService', function($scope, $window, $location, LoginService) {
    $scope.formSubmit = function() {
        //$location.path('/home');

        if(LoginService.login($scope.username, $scope.password)) {
            console.log('yep, its ok')
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            //$state.transitionTo('home');
            $location.path('/home');
        } else {
            $scope.error = "Incorrect username/password";
        }
    };
}]);