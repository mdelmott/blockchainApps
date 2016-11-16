//Angular
require('angular');
require('angular-environment');

//Modules
require('./module1/module1');
require('./module2/module2');
require('./error/error');

//Module APP
angular.module('TestApp', ['module1', 'module2', 'error', 'environment'])
    .config(function(envServiceProvider) {

        envServiceProvider.config({
            domains: {
                staging: ['mybluemix.net'],
                development: ['localhost', 'dev.local']
            },
            vars: {
                staging: {
                    serverUrl: 'http://blockchainserver.mybluemix.net/',
                },
                development: {
                    serverUrl: 'http://localhost:3000/',
                }
            }
        });

        envServiceProvider.check();
    });