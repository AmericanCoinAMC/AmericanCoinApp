/**
 * Created by Computadora on 04-Feb-17.
 */

app.factory('OrionAssignerController',
    [
        '$q', '$rootScope', 'OrionUtilities', '$timeout',
        '$interval', '$window', 'OrionCategoryUrlExtractor',
        function($q, $rootScope, OrionUtilities, $timeout,
                 $interval, $window, OrionCategoryUrlExtractor){
            var categoryExtractionInterval;
            var extractionObject = {};
            var categoryUrlsArray = [];
            var index = -1;

            //Orion Speed Atomic Object
            var orionSpeedClass = new OrionSpeed();
            var orionSpeedObject = new AtomicObject(orionSpeedClass.db);
            var orionSpeedInstanceID;

            //Tasks
            var activeTaskClass = new ActiveTask();
            var rejectedTaskClass = new RejectedTask();

            //Orion Activity
            var orionActivityClass = new OrionActivity();

            return{


                /*
                 * OrionAssignerController initialization
                 *
                 * @param - none
                 * @returns - BOOLEAN
                 * */
                on: function(){
                    var self = this;
                    var deferred = $q.defer();

                    //Initialize the Speed Object
                    orionSpeedObject.$on().then(function(instanceID){
                        $timeout(function(){
                            //Create local copy of the Atomic Object Instance ID
                            orionSpeedInstanceID = instanceID;

                            //Build Extraction Object
                            OrionUtilities.buildExtractionObject()
                                .then(function(extractionObj){

                                    //Delay Process for 5 seconds in order to guarantee proper object building
                                    $timeout(function(){
                                        //Create local copy of the extractionObject
                                        extractionObject = extractionObj;

                                        console.log(extractionObj);
                                        //Build Category URLs Array
                                        self.buildCategoryUrls();



                                        /*
                                         * Create Category URLs Extraction $interval
                                         * */
                                        categoryExtractionInterval =
                                            $interval(
                                                self.extractCategoryUrl, //function
                                                orionSpeedObject.item.assigner.categoryUrlExtraction, //$interval period in MS
                                                categoryUrlsArray.length, //Iteration number
                                                false, //invokeApply - If set to false skips model dirty checking, otherwise will invoke fn within the $apply block.
                                                self //Copy of current this
                                            );

                                        console.log('Orion Assigner Initialized');
                                        orionActivityClass.log('assigner');
                                        //Resolve Promise
                                        deferred.resolve(true);
                                    }, orionSpeedObject.item.assigner.extractionObjectConstruction);
                                })
                                .catch(function(err){deferred.reject(err)});

                            //Update local object whenever data changes
                            document.addEventListener(orionSpeedInstanceID + '_object_changed', function (newItem) {
                                $timeout(function(){
                                    orionSpeedObject.item = newItem;
                                });
                            }, false);
                        }, 100);
                    }).catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },


                /*
                 * extractCategoryUrl - Called by categoryExtractionInterval $interval
                 *
                 * @param - self (from previous instance)
                 * @returns -
                 * */
                extractCategoryUrl: function(self){
                    var deferred = $q.defer();
                    ++index;

                    //If elements remaining, otherwise turn off
                    if(index <= categoryUrlsArray.length){
                        //Build Category Url Extraction Object
                        var urlExtractionObject = {
                            url: categoryUrlsArray[index].categoryUrl,
                            source: {
                                name: extractionObject.sources[categoryUrlsArray[index].sourceKey].information.name,
                                parentSelector: extractionObject.sources[categoryUrlsArray[index].sourceKey].extraction.categoryUrls.parentSelector,
                                childSelector: extractionObject.sources[categoryUrlsArray[index].sourceKey].extraction.categoryUrls.childSelector
                            }
                        };

                        //Extract and Process URLs
                        OrionCategoryUrlExtractor.extractCategoryUrl(urlExtractionObject)
                            .then(function(urlsArray){
                                orionActivityClass.log('assigner');
                                self
                                    .processTasks(
                                        urlsArray,
                                        categoryUrlsArray[index].categoryUrl,
                                        categoryUrlsArray[index].sourceKey,
                                        categoryUrlsArray[index].categoryKey
                                    )
                                    .then(function(){

                                        //Last Iteration
                                        if(index == categoryUrlsArray.length - 1){
                                            self.reset();
                                        }
                                        deferred.resolve(true);
                                    })
                                    .catch(function(err){
                                        console.log(err);
                                        if(index == categoryUrlsArray.length - 1){
                                            self.reset();
                                        }
                                        deferred.reject(err);
                                    });
                            })
                            .catch(function(err){
                                if(index == categoryUrlsArray.length - 1){
                                    self.reset();
                                }
                                deferred.reject(err);
                            });
                    }else{
                        self.reset();
                    }

                    return deferred.promise;
                },


                /*
                 * Process Tasks
                 *
                 * @param - URLs Array, categoryUrl, sourceKey, categoryKey
                 * @returns Promise with BOOLEAN
                 * */

                processTasks: function(urlsArray, categoryUrl, sourceKey, categoryKey){
                    var self = this;
                    var deferred = $q.defer();

                    //Generate a filtered version of the urlsArray
                    self.filterUrls(urlsArray)
                        .then(function(filteredUrlsArray){
                            //Loop through each element and create tasks
                            for(var i = 0; i < filteredUrlsArray.length; i++){

                                self.createTask(filteredUrlsArray[i], categoryUrl, sourceKey, categoryKey)
                                    .then(function(){
                                        deferred.resolve(true);
                                    })
                                    .catch(function(err){deferred.reject(err)});
                            }
                            orionActivityClass.log('assigner');
                            deferred.resolve(true);
                        })
                        .catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },


                /*
                 * Create Task
                 *
                 * @params - url, categoryUrl, sourceKey, categoryKey
                 * @returns Promise with snapshot's key
                 * */
                createTask: function(url, categoryUrl, sourceKey, categoryKey){
                    var self = this;
                    var deferred = $q.defer();

                    activeTaskClass.db.query
                        .create({
                            articleUrl: url,
                            categoryUrl: categoryUrl,
                            sourceKey: sourceKey,
                            categoryKey: categoryKey
                        })
                        .then(function(snapshotKey){
                            deferred.resolve(snapshotKey);
                        })
                        .catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },

                /*
                 * Filter URLs
                 *
                 * @param - URLs Array
                 * @returns Promise with filtered URLs Array
                 * */
                filterUrls: function(urlsArray){
                    var self = this;
                    var deferred = $q.defer();
                    var filteredUrls = [];

                    /*
                     * Loop through the urlsArray and if article doesn't
                     * exists active task is created. Otherwise, ignores
                     * the URL
                     * */

                    var i = 0;
                    for(i; i < urlsArray.length; i++){

                        self.filterUrl(urlsArray[i])
                            .then(function(response){
                                if(!response.exists){
                                    filteredUrls.push(response.url);
                                }

                                deferred.resolve(filteredUrls);
                            })
                            .catch(function(err){deferred.reject(err)});


                    }
                    orionActivityClass.log('assigner');
                    return deferred.promise;
                },

                filterUrl: function(url){
                    var self = this;
                    var deferred = $q.defer();

                    self.articleExists(url)
                        .then(function(exists){
                            if(exists){
                                deferred.resolve({
                                    exists: true,
                                    url: url
                                });
                            }else{
                                deferred.resolve({
                                    exists: false,
                                    url: url
                                });
                            }
                            orionActivityClass.log('assigner');
                        })
                        .catch(function(err){deferred.reject(err)});

                    return deferred.promise;
                },


                /*
                 * buildCategoryUrls
                 *
                 * @param - none
                 * @returns - VOID - Builds categoryUrlsArray
                 * */
                buildCategoryUrls: function(){
                    //Loop Through Extraction Object Sources
                    for (var sourceKey in extractionObject.sources) {
                        if (extractionObject.sources.hasOwnProperty(sourceKey)) {

                            //Loop Through Extraction Object Source Categories
                            for (var categoryKey in extractionObject.sources[sourceKey].categories) {
                                if (extractionObject.sources[sourceKey].categories.hasOwnProperty(categoryKey)) {

                                    //Loop Through Extraction Object Source Category URLs
                                    for (var categoryUrlKey in extractionObject.sources[sourceKey].categories[categoryKey]) {
                                        if (extractionObject.sources[sourceKey].categories.hasOwnProperty(categoryKey)) {

                                            //Push to the Category URLs Array
                                            categoryUrlsArray.push({
                                                categoryUrl: extractionObject.sources[sourceKey].categories[categoryKey][categoryUrlKey].url,
                                                categoryKey: categoryKey,
                                                sourceKey: sourceKey
                                            });

                                        }
                                    }
                                    orionActivityClass.log('assigner');
                                }
                            }
                        }
                    }
                },


                /*
                 * Helpers
                 * */

                articleExists: function(url){
                    var deferred = $q.defer();

                    //Checks if URL exists in orionTasks/tasks/active
                    activeTaskClass.urlExists(url)
                        .then(function(activeTaskExists){

                            //Checks if URL exists in orionTasks/tasks/rejected
                            rejectedTaskClass.urlExists(url)
                                .then(function(rejectedTaskExists){
                                    deferred.resolve(activeTaskExists || rejectedTaskExists);
                                })
                                .catch(function(err){deferred.reject(err)});
                        })
                        .catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },




                /*
                 * Reset & Off Functionality
                 *
                 * @param - none
                 * @returns - VOID
                 * */
                reset: function(){
                    var self = this;
                    self.off();
                    $timeout(function(){
                        self.on();
                    }, 1000);
                },

                off: function(){
                    $interval.cancel(categoryExtractionInterval);
                    categoryExtractionInterval = null;
                    extractionObject = {};
                    categoryUrlsArray = [];
                    index = -1;
                }




            }
        }
    ]
);