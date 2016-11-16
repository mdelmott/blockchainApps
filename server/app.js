/**
 * Created by martin on 10/25/16.
 */
'use strict';

var express =  require('express');
var IBC = require('ibm-blockchain-js');
var Util = require('./util/util');
var Deploy = require('./deploy/deploy');

var app = express();
var router = express.Router();
var ibc = new IBC();
var util = new Util(app, ibc);

var chaincode;
var deploy;


app = util.config();
app.use('/', router);

router.use('/deploy', function(req, res){
    deploy = new Deploy(util, req.body);
    deploy.deploy(function(err,cc){
        if(err){
            res.status(500).send(err);
        }else{
            chaincode = cc;
            res.send(cc.details.deployed_name);
        }
    });
});

router.use('/query', function (req, res) {
    chaincode.query.read(req.body.args, function(err, chaincode_query){
       if(err != null){
           res.status(500).send(err);
       }else{
           res.send(chaincode_query);
       }
    });
});

router.use('/invoke', function(req,res) {
    chaincode.invoke.write(req.body.args,function(err,chaincode_invoke){
       if(err != null){
           res.status(500).send(err);
       }else{
           res.send(chaincode_invoke);
       }
    });
});

module.exports = app;