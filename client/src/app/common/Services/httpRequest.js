module.exports = function ($http,
                           $httpParamSerializerJQLike) {

    this.post = function(requestUrl, requestObject){
       return $http({
           url: requestUrl,
           method: 'POST',
           data: $httpParamSerializerJQLike(requestObject),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       });
    };
};