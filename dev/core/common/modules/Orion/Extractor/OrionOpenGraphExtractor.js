/**
 * Created by Computadora on 06-Feb-17.
 */

app.factory('OrionOpenGraphExtractor', [
    '$q', '$rootScope', '$http',
    function($q, $rootScope, $http){
        var url;

        var openGraph = {
            facebook: {
                title: null,
                description: null,
                image: null
            },
            ogioOpenGraph: {
                title: null,
                description: null,
                image: null
            },
            ogioHybridGraph: {
                title: null,
                description: null,
                image: null
            },
            ogioHtmlInferred: {
                title: null,
                description: null,
                image: null
            }
        };

        return{

            /*
            * Get - Populates OpenGraph Object with Facebook & OpenGraph.io APIs
            * */
            get: function(scrapingUrl){
                var self = this;
                var deferred = $q.defer();

                url = scrapingUrl;

                //Populate data and handle any eventuality
                self.populateFacebookGraph()
                    .then(function(){
                        self.populateOgioGraph()
                            .then(function(){
                                deferred.resolve(openGraph);
                            })
                            .catch(
                                deferred.resolve(openGraph)
                            );
                    })
                    .catch(function(err){
                        //If there is a problem with Facebook, resolve opengraph.io
                        self.populateOgioGraph()
                            .then(function(){
                                deferred.resolve(openGraph);
                            })
                            .catch(function(err){deferred.reject(err)});
                    });
                return deferred.promise;
            },




            /*
            * Facebook Scraping
            * */

            populateFacebookGraph: function(){
                var self = this;
                var deferred = $q.defer();
                //Extract Facebook's Graph and populate local OpenGraph object
                self.extractFacebookGraph()
                    .then(function(fbOpenGraph){
                        openGraph.facebook = {
                            title: fbOpenGraph.title || false,
                            description: fbOpenGraph.description || false,
                            image: fbOpenGraph.image[0].url || false
                        };
                        deferred.resolve(true);
                    })
                    .catch(function(err){
                        openGraph.facebook = {
                            title: false,
                            description: false,
                            image: false
                        };
                        deferred.reject(err);
                    });
                return deferred.promise;
            },

            extractFacebookGraph: function(){
                var deferred = $q.defer();
                FB.api(
                    '/',
                    'POST',
                    {"scrape":"true","id":url},
                    function(response) {
                        if(response && !response.error){
                            deferred.resolve(response);
                        }else if(response.error){
                            deferred.reject(response.error);
                        }

                    }
                );
                return deferred.promise;
            },


            /*
            * OpenGraph.io Scraping
            * */

            populateOgioGraph: function(){
                var self = this;
                var deferred = $q.defer();

                self.extractOgioGraph()
                    .then(function(ogioGraph){
                        openGraph.ogioOpenGraph = {
                            title: ogioGraph.openGraph.title || false,
                            description: ogioGraph.openGraph.description || false,
                            image:  ogioGraph.openGraph.image || false
                        };
                        openGraph.ogioHybridGraph = {
                            title: ogioGraph.hybridGraph.title || false,
                            description: ogioGraph.hybridGraph.description || false,
                            image:  ogioGraph.hybridGraph.image || false
                        };
                        openGraph.ogioHtmlInferred = {
                            title: ogioGraph.htmlInferred.title || false,
                            description: ogioGraph.htmlInferred.description || false,
                            image:  ogioGraph.htmlInferred.image_guess || ogioGraph.htmlInferred.images[0] || false
                        };
                        deferred.resolve(true);
                    })
                    .catch(function(err){
                        openGraph.ogioOpenGraph = {
                            title: false,
                            description: false,
                            image: false
                        };
                        openGraph.ogioHybridGraph = {
                            title: false,
                            description: false,
                            image: false
                        };
                        openGraph.ogioHtmlInferred = {
                            title: false,
                            description: false,
                            image: false
                        };
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            extractOgioGraph: function(){
                var deferred = $q.defer();
                $http.get('https://opengraph.io/api/1.0/site/'+url+'?app_id=' + $rootScope.apiKeysObject.item.ogioApi.appId)
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            },

        }
    }]);