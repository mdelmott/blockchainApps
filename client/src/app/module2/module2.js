require('angular-route');
require('oclazyload');
require('angular-ui-bootstrap');


//Controller
var module2Ctrl = require('./Controllers/Module2Controller');

//Services

//Directives

//Config
angular.module('module2', ['ngRoute', 'oc.lazyLoad', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/module2", {
                templateUrl : "views/module2.html",
                controller: "module2Ctrl",
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
    .controller('module2Ctrl', module2Ctrl);

