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

    $scope.invokeObj = {
        function: "",
        args: ["a", "b", "10"]
    };

    $scope.query = function () {

        httpRequest.post(envService.read('serverUrl') + "query", $scope.queryObj)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log(error);
            });
    };

    $scope.invoke = function () {

        httpRequest.post(envService.read('serverUrl') + "invoke", $scope.invokeObj)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log(error);
            });
    };
};