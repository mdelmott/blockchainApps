/**
 * Created by martin on 10/25/16.
 */

const Q = require('q');

module.exports = class Deploy {

    constructor(util, body) {
        this.util = util;
        this.chaincodeUrl = body.chaincodeUrl;
        this.func = body.function;
        this.args = body.args;
        this.user = {
            enrollId : body.enrollId,
            enrollSecret : body.enrollSecret,
            username : body.enrollId,
            secret : body.enrollSecret
        };

    }

    deploy(callback){

        let deferred = Q.defer();
        let t = this;

        this.util.configChaincode(this.user, this.chaincodeUrl, function(err,cc){
            if(err != null){
                deferred.reject(err);
            }else{
                let object = {cc : cc, func : t.func, args : t.args};
                deferred.resolve(object);
            }
        });

        deferred.promise.then(function(obj){
            obj.cc.deploy(obj.func, obj.args, null, null, function(chaincode_deployed) {
                if(chaincode_deployed.details.result != null){
                    obj.cc.details.deployed_name = chaincode_deployed.details.result.message;
                    callback(null, obj.cc);
                }else{
                    callback("error during chaincode deployment");
                }
            });
        },function (err) {
            callback(err);
        });
    }
};
