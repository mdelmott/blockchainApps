/**
 * Created by martin on 10/25/16.
 */
'use strict';

var express =  require('express');
var Q = require('q');
var IBC = require('ibm-blockchain-js');
var Util = require('./util/util');

var app = express();
var router = express.Router();
var ibc = new IBC();
var util = new Util(app,ibc);

var chaincode;

app = util.config();
app.use('/', router);

router.use('/deploy', function(req, res){

    var deferred = Q.defer();

    util.configChaincode(req.body.peer,req.body.chaincodeUrl, function(err,cc){
       if(err != null){
           deferred.reject(err);
       }else{
           deferred.resolve(cc);
       }
    });

    deferred.promise.then(function(cc){
        cc.deploy(req.body.function, req.body.args, null, null, function(chaincode_deployed) {
            if(chaincode_deployed.details.result != null){
                cc.details.deployed_name = chaincode_deployed.details.result.message;
                chaincode = cc;
                res.send(chaincode_deployed.details.result.message);
            }else{
                res.send("error during chaincode deployment");
            }
        });
    },function (err) {
        res.send(err);
    });
});

router.use('/query', function (req, res) {
    chaincode.query.read(req.body.args, function(err, chaincode_query){
       if(err != null){
           res.statusCode = "500";
           res.send(err);
       }else{
           res.statusCode = "200";
           res.send(chaincode_query);
       }
    });
});

router.use('/invoke', function(req,res) {
    chaincode.invoke.write(req.body.args,function(err,chaincode_invoke){
       if(err != null){
           res.statusCode = "500";
           res.send(err);
       }else{
           res.statusCode = "200";
           res.send(chaincode_invoke);
       }
    });
});

module.exports = app;