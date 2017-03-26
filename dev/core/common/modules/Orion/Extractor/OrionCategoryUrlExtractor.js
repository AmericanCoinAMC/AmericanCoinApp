/**
 * Created by Computadora on 04-Feb-17.
 */

app.factory('OrionCategoryUrlExtractor', [
    '$q', '$rootScope', '$http',
    function($q, $rootScope, $http){

    return{

        extractCategoryUrl: function(extractionObject){
            var deferred = $q.defer();

            //Post required data to extract Article URLs from Source Category URL
            $http.post($rootScope.apiKeysObject.item.categoryUrlsExtractor.url,
                {
                    key: $rootScope.apiKeysObject.item.categoryUrlsExtractor.key,
                    url: extractionObject.url,
                    sourceName: extractionObject.source.name,
                    parentSelector: extractionObject.source.parentSelector,
                    childSelector: extractionObject.source.childSelector
                })
                .then(function successCallback(response) {

                    //If API returns a Success Response "response.data.value" (Notice that array can be empty)
                    if(response.data.result == "SUCCESS"){
                        var urls = response.data.value;
                        deferred.resolve(urls);
                    }
                    //If API returns an error. Example: INVALID_KEY
                    else if(response.data.result == "ERROR"){
                        deferred.reject(response.data.value);
                    }
                    //Another posible error
                    else{
                        deferred.reject("ERROR");
                    }
                }, function errorCallback(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }



    }
}]);