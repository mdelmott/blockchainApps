/**
 * Created by martin on 10/25/16.
 */

var request = require('request-promise');

module.exports = class Invoke {

    constructor(chaincode, functionName, functionArgs) {
        this.chaincode = chaincode;
        this.functionName = functionName;
        this.functionArgs = functionArgs;
        this.method = 'invoke';
        this.paramChaincodeID = {
            "name": chaincode.chaincodeId
        };
    }

    invoke() {
        return this.chaincode.request(this.functionName, this.functionArgs, this.method, this.paramChaincodeID)
            .then(function (response) {
                console.log('invoke : %s ', response.result.message);
            });
    }
};