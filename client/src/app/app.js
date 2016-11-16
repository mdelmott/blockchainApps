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
                development: ['localhost', 'dev.local'],
                staging: ['mybluemix.net']
            },
            vars: {
                development: {
                    serverUrl: 'http://localhost:3000/',
                },
                staging: {
                    serverUrl: 'http://blockchainserver.mybluemix.net/',
                }
            }
        });

        envServiceProvider.check();
    });