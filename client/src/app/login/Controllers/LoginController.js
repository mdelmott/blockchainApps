module.exports = function ($scope,
                           envService,
                           httpRequest) {

    $scope.deployObj = {
        peer: "0",
        enrollId: "user_type1_2",
        enrollSecret: "95aa694feb",
        chaincodeUrl: "https://github.com/mdelmott/blockchainChaincodes",
        function: "init",
        args: ["a", "100", "b", "200"]
    };

    $scope.deploy = function () {

        httpRequest.post(envService.read('serverUrl') + "deploy", $scope.deployObj)
            .then(function successCallback(response) {
                $scope.result = response.data;
            }, function errorCallback(error) {
                console.log("Error : ");
                console.log(error);
                $scope.result = error;
            });
    };

    $scope.helloWorld = function () {
        return "Hello World!!";
    };
};