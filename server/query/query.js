/**
 * Created by martin on 10/25/16.
 */

var request = require('request-promise');

module.exports = class Query {

    constructor(chaincode, functionName, functionArgs) {
        this.chaincode = chaincode;
        this.functionName = functionName;
        this.functionArgs = functionArgs;
        this.method = 'query';
        this.paramChaincodeID = {
            "name": chaincode.chaincodeId
        };
    }

    query() {
        return this.chaincode.request(this.functionName, this.functionArgs, this.method, this.paramChaincodeID)
            .then(function (response) {
                console.log('query : %s ', response.result.message);
            });
    }
};
