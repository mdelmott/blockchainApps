/**
 * Created by martin on 11/16/16.
 */
module.exports = function ($scope,
                           httpRequest,
                           envService) {

    $scope.queryObj = {
        args: ["queryTable"]
    };

    $scope.insertObj = {
        args: ["insertTable", "a", "b", "c"]
    };

    $scope.query = function () {
        httpRequest.post(envService.read('serverUrl') + "query", $scope.queryObj)
            .then(function successCallback(response) {
                console.log(response);
                //$scope.result = response.data;
            }, function errorCallback(error) {
                console.log(error);
                //$scope.result = error;
            });
    };

    $scope.insert = function () {
        httpRequest.post(envService.read('serverUrl') + "invoke", $scope.insertObj)
            .then(function successCallback(response) {
                console.log(response);
                //$scope.result = "ok";
            }, function errorCallback(error) {
                console.log(error);
                //$scope.result = error;
            });
    };
};