//Angular
require('angular');
require('angular-environment');

//Modules
require('./common/common');
require('./login/login');
require('./module2/module2');
require('./table/table');
require('./error/error');

//Module APP
angular.module('TestApp', ['common' ,'login', 'module2', 'table', 'error', 'environment'])
    .config(function(envServiceProvider) {

        envServiceProvider.config({
            domains: {
                staging: ['blockchainclient.mybluemix.net'],
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