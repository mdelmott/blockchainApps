//node modules

//Controller

//Services
var httpRequest = require('./Services/httpRequest');

//Directives

//Config
angular.module('common', [])
    .service('httpRequest', httpRequest);
