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
        $scope.cityLabel = city;

        WeatherService.getForecastForCity(city)
            .then(function(res) {
                $scope.isCityAvailable = true;
                $scope.temperaturesData = res.data.temperaturesData;

                $scope.maxTemperature = {
                    temperature: res.data.maxTemperature[0].temperature,
                    datetime: $scope.transformDate(res.data.maxTemperature[0].datetime)
                }

                $scope.minTemperature = {
                    temperature: res.data.minTemperature[0].temperature,
                    datetime: $scope.transformDate(res.data.minTemperature[0].datetime)
                }

                $scope.error = '';
            }, function(err) {
                if (err.status === 401) {
                    $location.path('/login');
                }
                $scope.isCityAvailable = false;
                $scope.error = 'Could not get forecast for such city';
                $scope.temperaturesData = null;
            })   
    }

    $scope.transformDate = function(date) {
        date = new Date(date);
        return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ', ' + date.getUTCHours() + 'h';
    }

    $scope.getForecastForCity('Sofia');
}]);
