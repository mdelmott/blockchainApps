module.exports = function($scope,
                          $http,
                          $httpParamSerializerJQLike,
                          service2Serv){

    /*$scope.registerObj = {
        peer : "2",
        enrollId : "WebAppAdmin",
        enrollSecret: "7b17d187da"
    };*/

    $scope.deployObj = {
        peer : "0",
        enrollId : "user_type1_2",
        enrollSecret: "95aa694feb",
        chaincodeUrl : "https://github.com/mdelmott/blockchainChaincodes",
        function : "init",
        args : ["a","100","b","200"]
    };

    $scope.queryObj = {
        function : "",
        args: ["a"]
    };

    $scope.invokeObj = {
        function : "",
        args : ["a","b","10"]
    };

    /*$scope.register = function () {
        $http({
            url: "http://localhost:3000/register",
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.registerObj),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
            console.log("Response : ");
            console.log(response);
        }, function errorCallback(error) {
            console.log("Error : ");
            console.log(error);
            $scope.result = error;
        });
    };*/

    $scope.deploy = function(){
        $http({
            url: "http://localhost:3000/deploy",
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.deployObj),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
            $scope.result = response.data;
        }, function errorCallback(error) {
            console.log("Error : ");
            console.log(error);
            $scope.result = error;
        });
    };

    $scope.query = function(){
        $http({
            url: "http://localhost:3000/query",
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.queryObj),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
            console.log(response);
        }, function errorCallback(error) {
            console.log(error);
        });
    };

    $scope.invoke = function(){
        $http({
            url: "http://localhost:3000/invoke",
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.invokeObj),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
            console.log(response);
        }, function errorCallback(error) {
            console.log(error);
        });
    };

    $scope.helloWorld = function(){
        return "Hello World!!";
    };
};