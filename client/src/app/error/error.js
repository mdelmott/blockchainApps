angular.module('error',[])
    .config(function($routeProvider) {
        $routeProvider
            .when('/error',{
                templateUrl: 'Views/error.html'
            })
            .otherwise({
                redirectTo : "/error"
            })
    });