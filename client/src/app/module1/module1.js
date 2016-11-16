//module1 node modules
require('angular-route');
require('oclazyload');
require('angular-ui-bootstrap');


//Controller
var module1Ctrl = require('./Controllers/Module1Controller');

//Services
var service2Serv = require('./Services/service2');

//Directives


//Config
angular.module('module1', ['ngRoute', 'oc.lazyLoad', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "views/module1.html",
                controller: "module1Ctrl",
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
    .controller('module1Ctrl', module1Ctrl)
    .service('service2Serv', service2Serv);
