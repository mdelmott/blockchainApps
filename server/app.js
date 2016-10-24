'use strict';

// Module dependencies.
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');

// Create Express server.
var app = express();

var Chaincode = require('./chaincode');
var chaincodeExample02 = new Chaincode('http://localhost:7050',
    'github.com/hyperledger/fabric/examples/chaincode/go/chaincode_example02', 1);

/*var chaincodeJava = new Chaincode('http://172.17.0.3:7050',
 'examples/chaincode/java/MyExemple', 4);*/

var chaincodePaul = new Chaincode('http://134.168.60.134:7050',
    'https://github.com/piitaya/hyperledger-starter-chaincode', 1);

var chaincode;
var chaincodeJava;

// Express configuration.
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve client2 part
app.use(express.static(path.join(__dirname, '/client2')));

// Error Handler.
app.use(errorHandler());

// Start Express server.
app.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode',
        app.get('port'), app.get('env'));
});

var router = express.Router();
app.use('/', router);

router.use('/api-example02', require('./api-example02'));

router.use('/testDeploy', (req, res) => {
    chaincode = new Chaincode(req.param('host'), req.param('path'), req.param('type'))
    simpleJsonResponse(res, chaincode.deploy('init', ["a", "100", "b", "200"]));
});


router.use('/testDeployExample02', (req, res) => {
    simpleJsonResponse(res, chaincodeExample02.deploy('init', ["a", "100", "b", "200"]));
});

router.use('/testQueryExample02', (req, res) => {
    simpleJsonResponse(res, chaincodeExample02.query.query('a'));
});

router.use('/testInvokeExample02', (req, res) => {
    simpleJsonResponse(res, chaincodeExample02.invoke.invoke('a', 'b', '42'));
});

router.use('/testDeployJava', (req, res) => {
    chaincodeJava = new Chaincode(req.param('host'), req.param('path'), req.param('type'))
    simpleJsonResponse(res, chaincodeJava.deploy('init', ["a", "100", "b", "200"]));
});

router.use('/testQueryJava', (req, res) => {
    simpleJsonResponse(res, chaincodeJava.query.query('a'));
});

router.use('/testInvokeJava', (req, res) => {
    simpleJsonResponse(res, chaincodeJava.invoke.invoke('a', 'b', '42'));
});

router.use('/testFusionJava', (req, res) => {
    simpleJsonResponse(res, chaincodeJava.invoke.fusion('a', 'b'));
});

router.use('/testDeployPaul', (req, res) => {
    simpleJsonResponse(res, chaincodePaul.deploy('init', [""]));
});

router.use('/testQueryPaul', (req, res) => {
    simpleJsonResponse(res, chaincodePaul.query.getAccount('benji'));
});


router.use('/testInvokePaul', (req, res) => {
    simpleJsonResponse(res,
        chaincodePaul.invoke.createAccount(JSON.stringify({
            username: 'benji',
            money: 100
        })));
});


var simpleJsonResponse = (res, promise) => {
    promise.then((response) => {
        res.json(response);
    }).catch((error) => {
        res.status(500).json(error);
    });
}


module.exports = app;
