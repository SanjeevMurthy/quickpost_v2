angular.module('app', ['ngResource', 'ngRoute','ngCookies']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main.html', controller: 'qpMainCtrl'});
});

