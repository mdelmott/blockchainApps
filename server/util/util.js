/**
 * Created by martin on 10/25/16.
 */

const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const express = require('express');
const fs = require('fs');

module.exports = class Util {

    constructor(app, ibc) {
        this.app = app;
        this.ibc = ibc;
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

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        return this.app;
    };

    configChaincode(user, chaincodeUrl, callback) {

        let manual, peers;
        let t = this;

        try{
            manual = JSON.parse(fs.readFileSync(path.join(__dirname, '../creds.json'), 'utf8'));
            peers = manual.credentials.peers;
        }
        catch(err){
            callback(err);
        }

        t.configOptions(0, peers, user, chaincodeUrl, function(err,cc){
            if(err){
                callback(err);
            }else{
                callback(null, cc);
            }
        });
    };


    configOptions(peer, peers, user, chaincodeUrl, callback){

        let t = this;

        let options = {
            network : {
                peers : [peers[peer]],
                users : [user],
                options: {
                    maxRetry: 1
                }
            },
            chaincode : {
                zip_url: 'https://github.com/ibm-blockchain/marbles-chaincode/archive/master.zip',
                unzip_dir: 'marbles-chaincode-master/part2',
                git_url: chaincodeUrl
            }
        };

        t.ibc.load(options, function(err, cc){
            if(err != null){
                if(peer==3){
                    callback(err);
                }else{
                    peer = peer + 1;
                    t.configOptions(peer, peers, user, chaincodeUrl, function(err,cc){
                        if(err != null){
                            callback(err);
                        }else{
                            callback(null,cc);
                        }
                    });
                }
            }else{
                callback(null,cc);
            }
        });
    }
};