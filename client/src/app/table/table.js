require('angular-route');
require('oclazyload');
require('angular-ui-bootstrap');


//Controller
var tableCtrl = require('./Controllers/TableController');

//Services

//Directives

//Config
angular.module('table', ['ngRoute', 'oc.lazyLoad', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/table", {
                templateUrl : "views/table.html",
                controller: "tableCtrl",
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
    .controller('tableCtrl', tableCtrl);

