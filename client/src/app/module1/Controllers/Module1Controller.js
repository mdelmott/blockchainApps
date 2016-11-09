module.exports = function($scope,
                          $http,
                          $httpParamSerializerJQLike,
                          service2Serv){
    /*$scope.user = "Martin";

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }*/

    $scope.deployObj = {
        peer : "1",
        chaincodeUrl : "https://github.com/mdelmott/blockchainChaincodes",
        function : "init",
        args : ["a","100","b","200"]
    };

    $scope.queryObj = {
        function : "",
        args: [""]
    };

    $scope.invokeObj = {
        function : "",
        args : [""]
    };

    $scope.deploy = function(){
        $http({
            url: "http://blockchainserver.mybluemix.net/deploy",
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.deployObj),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
                console.log(response);
        }, function errorCallback(error) {
                console.log(error);
        });
    };

    $scope.query = function(){
        $http({
            url: "http://blockchainserver.mybluemix.net/query",
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
            url: "http://blockchainserver.mybluemix.net/invoke",
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