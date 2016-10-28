/**
 * Created by martin on 10/25/16.
 */

var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var express = require('express');

module.exports = class Util {

    constructor(app) {
        this.app = app;
    }

    config() {

        //this.app.set('port', process.env.PORT || 3000);
        this.app.set('port', process.env.VCAP_APP_PORT || 3000);
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        // Serve client2 part
        this.app.use(express.static(path.join(__dirname, '/client2')));

        // Error Handler.
        this.app.use(errorHandler());

        // Start Express server.
        this.app.listen(this.app.get('port'), function(){
            //console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
            console.log('Express server listening on port 3000 in dev mode');
        });

        return this.app;
    }

    simpleJsonResponse(res,promise) {
        promise.then(function (response) {
            res.json(response);
        }).catch(function(error){
            res.status(500).json(error);
        });
    };

};