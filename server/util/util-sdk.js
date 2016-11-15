/**
 * Created by martin on 10/25/16.
 */

var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var express = require('express');
var fs = require('fs');

module.exports = class Util {

    constructor(app, hfc) {
        this.app = app;
        this.hfc = hfc;
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

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        return this.app;
    }

    configChaincode(peer, callback) {

        var chain, network, peers, users, isHSBN, network_id, ca_url, uuid, certFile, cert;

        chain = this.hfc.newChain("mychain");

        try{
            network = JSON.parse(fs.readFileSync(path.join(__dirname, '../creds.json'), 'utf8'));
            if (network.credentials) network = network.credentials;
        }
        catch(err){
            callback(err);
        }

        peers = network.peers;
        users = network.users;
        isHSBN = peers[0].discovery_host.indexOf('secure') >= 0 ? true : false;
        network_id = Object.keys(network.ca);
        ca_url = "grpcs://" + network.ca[network_id].discovery_host + ":" + network.ca[network_id].discovery_port;
        uuid = network_id[0].substring(0, 8);
        chain.setKeyValStore(this.hfc.newFileKeyValStore(__dirname + '/keyValStore-' + uuid));

        if (isHSBN) {
            certFile = '../0.secure.blockchain.ibm.com.cert';
        }else{
            certFile = '../us.blockchain.ibm.com.cert';
        }

        cert = fs.readFileSync(path.join(__dirname, certFile), 'utf8');
        chain.setMemberServicesUrl(ca_url, {pem: cert});
        for (var i = 0; i < peers.length; i++) {
            chain.addPeer("grpcs://" + peers[i].discovery_host + ":" + peers[i].discovery_port, {pem: cert});
        }

        chain.enroll(users[1].enrollId, users[1].enrollSecret, function (err, admin) {
           if(err){
               callback(err);
           }else{
               chain.setRegistrar(admin);
               callback(null,admin);
           }
        });
    }

    simpleJsonResponse(res,promise) {
        promise.then(function (response) {
            res.json(response);
        }).catch(function(error){
            res.status(500).json(error);
        });
    };

};