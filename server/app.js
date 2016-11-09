/**
 * Created by martin on 10/25/16.
 */
'use strict';

var express =  require('express');
var Q = require('q');
var IBC = require('ibm-blockchain-js');
var Util = require('./util/util');
var Chaincode = require('./chaincode');
var Deploy = require('./deploy/deploy');
var Query = require('./query/query');
var Invoke = require('./invoke/invoke');

var app = express();
var router = express.Router();
var ibc = new IBC();
var util = new Util(app,ibc);

var chaincode;
var deploy;
var query;
var invoke;

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
            cc.details.deployed_name = chaincode_deployed.details.result.message;
            chaincode = cc;
            console.log(chaincode);
            res.send(chaincode_deployed.details.result.message);
        });
    },function (err) {
        res.send(err);
    });
});

/*router.use('/deploy', function(req,res){
    chaincode = new Chaincode('http://172.17.0.3:7050',
       'github.com/hyperledger/fabric/examples/chaincode/go/chaincode_example02', 1);
    deploy = new Deploy(chaincode,'init',["a", "100", "b", "200"]);
    var response = deploy.deploy().then(function(r){
        chaincode.chaincodeId = r.result.message;
        console.log('chaincode deployed. chaincodeId : %s', chaincode.chaincodeId);
    });
    util.simpleJsonResponse(res,response);
});*/

router.use('/query', function (req, res) {

    console.log(chaincode);

    //query = new Query(chaincode, req.params.function, req.params.args);
    //util.simpleJsonResponse(res,query.query());
    chaincode.query.read(["a"],function(chaincode_query){
       console.log(chaincode_query);
    });
});

/*router.use('/query', function (req, res){
    query = new Query(chaincode, 'query', ["a"]);
    util.simpleJsonResponse(res, query.query());
});*/

router.use('/invoke', function(req,res) {
    invoke = new Invoke(chaincode, req.params.function, req.params.args);
    util.simpleJsonResponse(res, invoke.invoke());
});

/*router.use('/invoke', function(req,res) {
    invoke = new Invoke(chaincode, 'invoke', ["a", "b", "40"]);
    util.simpleJsonResponse(res, invoke.invoke());
});*/

module.exports = app;