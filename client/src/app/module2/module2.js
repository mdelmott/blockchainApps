require('angular-route');

angular.module('module2',['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/module2", {
                templateUrl : "Views/module2.html"
            })
    });