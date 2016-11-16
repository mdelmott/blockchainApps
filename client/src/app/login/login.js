//module1 node modules
require('angular-route');
require('oclazyload');
require('angular-ui-bootstrap');


//Controller
var loginCtrl = require('./Controllers/LoginController');

//Services

//Directives


//Config
angular.module('login', ['ngRoute', 'oc.lazyLoad', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "views/login.html",
                controller: "loginCtrl",
                resolve : {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            files: [
                                './assets/css/bootstrap.min.css',
                                './assets/css/bootstrap-theme.min.css',
                                './assets/css/sample.css']
                        }]);
                    }]
                }
            })
    })
    .controller('loginCtrl', loginCtrl);
