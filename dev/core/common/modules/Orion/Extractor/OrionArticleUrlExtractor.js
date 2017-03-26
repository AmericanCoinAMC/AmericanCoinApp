/**
 * Created by Computadora on 06-Feb-17.
 */

app.factory('OrionArticleUrlExtractor', [
    '$q', '$rootScope', '$http',
    function($q, $rootScope, $http){

        return{

            extractArticleUrl: function(extractionObject){
                var deferred = $q.defer();

                //Post required data to extract Article URLs from Source Category URL
                $http.post($rootScope.apiKeysObject.item.articleExtractor.url,
                    {
                        key: $rootScope.apiKeysObject.item.articleExtractor.key,
                        url: extractionObject.url,
                        sourceName: extractionObject.source.name,
                        parentSelector: extractionObject.source.extraction.article.parentSelector,
                        childSelector: extractionObject.source.extraction.article.childSelector
                    })
                    .then(function successCallback(response) {

                        //If API returns a Success Response "response.data.value"
                        if(response.data.result == "SUCCESS"){
                            var content = response.data.value;
                            if(content){
                                deferred.resolve(content);
                            }else{
                                deferred.resolve(false);
                            }
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