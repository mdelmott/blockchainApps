module.exports = function ($scope,
                           $location,
                           envService,
                           httpRequest) {

    $scope.deployObj = {
        enrollId: "",
        enrollSecret: "",
        chaincodeUrl: "https://github.com/mdelmott/blockchainChaincodes/go/src/chaincode1",
        function: "init",
        args: ["a", "100", "b", "200"]
    };

    $scope.deploy = function () {

        httpRequest.post(envService.read('serverUrl') + "deploy", $scope.deployObj)
            .then(function successCallback(response) {
                console.log(response);
                $location.path('/table');
            }, function errorCallback(error) {
                console.log("Error : ");
                console.log(error);
                $scope.error = error.data.details.Error;
            });
    };

    $scope.helloWorld = function () {
        return "Hello World!!";
    };
};