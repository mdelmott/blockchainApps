/**
 * Created by martin on 10/25/16.
 */
'use strict';

process.env.GOPATH = "https://github.com/mdelmott/blockchainChaincodes/go";
var express =  require('express');
var Q = require('q');
var hfc = require('hfc');
var Util = require('./util/util-sdk');

var app = express();
var router = express.Router();
var util = new Util(app,hfc);

var chaincode;

app = util.config();
app.use('/', router);

router.use('/deploy', function(req, res){



    var deployRequest = {
        //chaincodePath: req.body.chaincodeUrl,
        chaincodePath: 'chaincode_example02',
        fcn: "init",
        args: ["a", "100", "b", "200"]
    };

    util.configChaincode(req.body.peer, function (err, admin) {
        if(err != null){
            res.send(err);
        }else{
            admin.deploy(deployRequest,function(err,cc_deployed){
                if(err){
                    console.log("err");
                    console.log(err);
                    res.send(err);
                }else{
                    console.log("cc_deployed");
                    console.log(cc_deployed);
                    res.send(cc_deployed);
                }
            });
        }
    });
});

router.use('/query', function (req, res) {

});

router.use('/invoke', function(req,res) {

});

module.exports = app;