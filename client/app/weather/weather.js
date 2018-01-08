'use strict';

angular.module('myApp.weather', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weather', {
    templateUrl: 'weather/weather.html',
    controller: 'WeatherCtrl'
  });
}])

.factory('WeatherService', ['$http', function($http) {
    return {
        getForecastForCity: function(city) {
            return $http({
                method:'GET',
                url: 'http://localhost:3000/forecast',
                params: { city: city }
            });
        }
    }
}])

.controller('WeatherCtrl', ['$scope', '$location', 'WeatherService', function($scope, $location, WeatherService) {
    $scope.getForecastForCity = function(city) {
        WeatherService.getForecastForCity(city)
            .then(function(res) {
                $scope.temperaturesData = res.data;
                $scope.error = '';
            }, function(err) {
                if (err.status === 401) {
                    $location.path('/login');
                }
                $scope.error = 'Could not get forecast for such city';
                $scope.temperaturesData = null;
            })   
    }

    $scope.getForecastForCity('Sofia');
}]);