var request = require('request-promise');

module.exports = class Chaincode {
    constructor(peerUrl, chaincodePath, chaincodeType) {
        this.peerUrl = peerUrl;
        this.chaincodePath = chaincodePath;
        this.chaincodeType = chaincodeType;
        this.chaincodeId = '';
        this.deployed = false;
    }

    deploy(initFunctionName, initFunctionArgs) {
        if (this.deployed) {
            return Promise.reject('this chaincode is already deployed. chaincodeId: ' + this.chaincodeId);
        }

        return this.requestBuilder().buildDeploy().request(initFunctionName, initFunctionArgs).then((response) => {
            this.deployed = true;
            this.chaincodeId = response.result.message;
            console.log('chaincode deployed. chaincodeId : %s', this.chaincodeId);
        });
    }

    get query() {
        return this.callMethodByProxy(this.requestBuilder().buildQuery());
    }

    get invoke() {
        return this.callMethodByProxy(this.requestBuilder().buildInvoke());
    }

    callMethodByProxy(methodRequest) {
        return new Proxy({}, {
            get: (target, name) => {
                return (...args) => {

                    if (!this.deployed) {
                        return Promise.reject('this chaincode has not been deployed.');
                    }

                    console.log('call on chaincode method %s, function %s, with arguments %s', methodRequest.method, name, args);

                    return methodRequest.request(name, args).then((response) => {
                        return response.result.message;
                    });

                }
            }
        });
    }


    requestBuilder() {
        return new class {
            constructor(chaincode) {
                this.chaincode = chaincode;
            }

            buildQuery() {
                this.method = 'query';
                this.paramChaincodeID = {"name": this.chaincode.chaincodeId};
                return this;
            }

            buildInvoke() {
                this.method = 'invoke';
                this.paramChaincodeID = {"name": this.chaincode.chaincodeId};
                return this;
            }

            buildDeploy() {
                this.method = 'deploy';
                this.paramChaincodeID = {"path": this.chaincode.chaincodePath};
                return this;
            }

            request(functionName, functionArgs) {
                return request({
                    method: 'POST',
                    url: this.chaincode.peerUrl + '/chaincode',
                    json: true,
                    body: {
                        "jsonrpc": "2.0",
                        "method": this.method,
                        "params": {
                            "type": this.chaincode.chaincodeType,
                            "chaincodeId": this.paramChaincodeID,
                            "ctorMsg": {
                                "function": functionName,
                                "args": functionArgs
                            }
                        },
                        "id": 1
                    }
                }).then((response) => {
                    console.log('%s function called. response :%s', this.method, response);
                    return response;
                }).catch((error) => {
                    console.log('%s has failed. See error below', this.method);
                    console.log(error.message);
                });

            }
        }(this);
    }

};
