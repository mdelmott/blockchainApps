angular.module('error',[])
    .config(function($routeProvider) {
        $routeProvider
            .when('/error',{
                templateUrl: 'views/error.html'
            })
            .otherwise({
                redirectTo : "/error"
            })
    });