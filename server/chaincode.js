/**
 * Created by martin on 10/25/16.
 */
var request = require('request-promise');

module.exports = class Chaincode {

    constructor(peerUrl, chaincodePath, chaincodeType) {
        this.peerUrl = peerUrl;
        this.chaincodePath = chaincodePath;
        this.chaincodeType = chaincodeType;
        this.chaincodeId = '';
        this.deployed = false;
    };

    request(functionName, functionArgs, method, paramChaincodeID) {
        return request({
            method: 'POST',
            url: this.peerUrl + '/chaincode',
            json: true,
            body: {
                "jsonrpc": "2.0",
                "method": method,
                "params": {
                    "type": this.chaincodeType,
                    "chaincodeId": paramChaincodeID,
                    "ctorMsg": {
                        "function": functionName,
                        "args": functionArgs
                    }
                },
                "id": 1
            }
        }).then(function (response) {
            console.log('%s function called. response :%s', method, response);
            return response;
        }).catch(function (error) {
            console.log('%s has failed. See error below', method);
            console.log(error.message);
        });
    };

};
