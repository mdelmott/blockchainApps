/**
 * Created by martin on 10/25/16.
 */

var request = require('request-promise');

module.exports = class Deploy {

    constructor(chaincode, functionName, functionArgs) {
        this.chaincode = chaincode;
        this.functionName = functionName;
        this.functionArgs = functionArgs;
        this.method = 'deploy';
        this.paramChaincodeID = {"path": chaincode.chaincodePath};
    }

    deploy() {
        return this.chaincode.request(this.functionName, this.functionArgs, this.method, this.paramChaincodeID);
    }
};
