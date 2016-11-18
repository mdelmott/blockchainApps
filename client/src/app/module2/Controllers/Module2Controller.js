/**
 * Created by martin on 11/16/16.
 */
module.exports = function ($scope,
                           httpRequest,
                           envService) {

    $scope.queryObj = {
        function: "",
        args: ["a"]
    };

    $scope.transactionObj = {
        args: ["transaction", "a", "b", "10"]
    };

    $scope.fusionObj = {
        args: ["fusion", "a", "b"]
    };

    $scope.addObj = {
        args: ["add", "c", "10"]
    };


    $scope.query = function () {
        httpRequest.post(envService.read('serverUrl') + "query", $scope.queryObj)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log(error);
            });
    };

    $scope.invoke = function (func) {

        switch(func){
            case "add": $scope.invokeObj = $scope.addObj;break;
            case "transaction": $scope.invokeObj = $scope.transactionObj;break;
            case "fusion": $scope.invokeObj = $scope.fusionObj;break;
            default: $scope.invokeObj = $scope.transactionObj;break;
        }

        httpRequest.post(envService.read('serverUrl') + "invoke", $scope.invokeObj)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log(error);
            });
    };
};