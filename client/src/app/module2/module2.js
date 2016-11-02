require('angular-route');

angular.module('module2',['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/module2", {
                templateUrl : "views/module2.html"
            })
    });