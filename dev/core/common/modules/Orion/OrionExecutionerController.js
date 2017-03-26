/**
 * Created by Computadora on 04-Feb-17.
 */

app.factory('OrionExecutionerController',
    ['$q', '$rootScope', '$timeout', '$interval', 'OrionArticleBuilder', 'OrionUtilities',
        function($q, $rootScope, $timeout, $interval, OrionArticleBuilder, OrionUtilities){
            var articleExtractionInterval;
            var extractionObject = {};

            //Orion Speed Atomic Object
            var orionSpeedClass = new OrionSpeed();
            var orionSpeedObject = new AtomicObject(orionSpeedClass.db);
            var orionSpeedInstanceID;

            //Tasks
            var activeTaskClass = new ActiveTask();
            var rejectedTaskClass = new RejectedTask();
            var completedTaskClass = new CompletedTask();

            //Orion Activity
            var orionActivityClass = new OrionActivity();

            //Article
            var articleClass = new Article();
            var pendingArticleClass = new PendingArticle();

            //Source
            var sourceClass = new Source();

            //Category
            var categoryClass = new Category();



            var assignedTask = {};

            return{

                /*
                 * Orion Executioner Controller initialization
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

                                        /*
                                         * Create Category URLs Extraction $interval
                                         * */

                                        articleExtractionInterval =
                                            $interval(
                                                self.extractArticleUrl, //function
                                                orionSpeedObject.item.executioner.articleUrlExtraction,
                                                0, //$interval period in MS - 0 = indefinite
                                                false, //invokeApply - If set to false skips model dirty checking, otherwise will invoke fn within the $apply block.
                                                self //Copy of current this
                                            );

                                        console.log('Orion Executioner Initialized');
                                        orionActivityClass.log('executioner');
                                        //Resolve Promise
                                        deferred.resolve(true);
                                    }, orionSpeedObject.item.executioner.extractionObjectConstruction);
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
                 * Extract Article URL
                 *
                 * @param - none
                 * @returns - BOOLEAN
                 * */
                extractArticleUrl: function(self){
                    var deferred = $q.defer();
                    //Retrieve Schema Object of the Oldest Task
                    self.assignTask()
                        .then(function(){
                            if(assignedTask){
                                //Perform Article Extraction
                                if(assignedTask.articleUrl && assignedTask.sourceKey && assignedTask.categoryKey){
                                    OrionArticleBuilder.build({
                                        url: assignedTask.articleUrl,
                                        source: {
                                            name: extractionObject.sources[assignedTask.sourceKey].information.name,
                                            extraction: extractionObject.sources[assignedTask.sourceKey].extraction
                                        }
                                    }).then(function(articleContent){
                                        orionActivityClass.log('executioner');
                                        //If article is valid continue. Otherwise handle invalid article.
                                        if(articleContent){

                                            //Create Source & Category Shortcuts
                                            var currentSource = extractionObject.sources[assignedTask.sourceKey].information;
                                            var currentCategory = extractionObject.categories[assignedTask.categoryKey];

                                            self.handleArticle({
                                                url: articleContent.url,
                                                title: articleContent.title,
                                                description: articleContent.description,
                                                image: articleContent.image,
                                                content: articleContent.content,
                                                source: sourceClass.db.schema.build(currentSource, 'foreign'),
                                                category: categoryClass.db.schema.build(currentCategory, 'foreign'),
                                                creationTS: assignedTask.creationTS
                                            }, currentCategory.autoSave).then(function(){
                                                deferred.resolve(true);
                                            }).catch(function(err){deferred.reject(err)});
                                        }else{
                                            self.handleInvalidArticle()
                                                .then(function(){
                                                    deferred.resolve(true);
                                                })
                                                .catch(function(err){deferred.reject(err)});
                                        }
                                    }).catch(function(err){deferred.reject(err)});
                                }else{
                                    deferred.resolve(true);
                                }
                            }else{
                                deferred.resolve(true);
                            }
                        })
                        .catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },


                /*
                 * Handle Article
                 * If article's category is autosave skip approval process. Otherwise, add it to pending.
                 * */
                handleArticle: function(articleContent, autoSave){
                    var self = this;
                    var deferred = $q.defer();

                    //If autoSave is enabled for current category save article directly. Otherwise, add to pending.
                    if(autoSave){
                        articleClass.db.query
                            .create(articleContent)
                            .then(function(){
                                self.handleArticleSaved()
                                    .then(function(){
                                        deferred.resolve(true);
                                    })
                                    .catch(function(err){deferred.reject(err)});
                            })
                            .catch(function(err){
                                console.log(err);
                                deferred.reject(err)}
                            )
                    }else{
                        pendingArticleClass.db.query
                            .create(articleContent)
                            .then(function(){
                                self.handleArticleSaved()
                                    .then(function(){
                                        deferred.resolve(true);
                                    })
                                    .catch(function(err){deferred.reject(err)});
                            })
                            .catch(function(err){
                                console.log(err);
                                deferred.reject(err)}
                            )
                    }
                    return deferred.promise;
                },

                /*
                 * Handle Article Saved
                 * When the article is saved a completed task must be created
                 * */
                handleArticleSaved: function(){
                    var deferred = $q.defer();
                    completedTaskClass.db.query.create(assignedTask)
                        .then(function(){
                            assignedTask = {};
                            deferred.resolve(true);
                        })
                        .catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },

                /*
                * Handle Invalid Article
                * If article is invalid create rejected task and clear local assignedTask
                * */
                handleInvalidArticle: function(){
                    var deferred = $q.defer();
                    var rejectedTask = assignedTask;
                    rejectedTask.reason = "INVALID_ARTICLE";
                    rejectedTaskClass.db.query.create(rejectedTask)
                        .then(function(){
                            assignedTask = {};
                            deferred.resolve(true);
                        })
                        .catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },


                /*
                 * AssignTask
                 *
                 * @param - none
                 * @returns - Atomic Schema Object of the oldest task.
                 * */

                assignTask: function(){
                    var deferred = $q.defer();

                    var taskRef = activeTaskClass.db.ref.root
                        .child(activeTaskClass.db.ref.primary)
                        .limitToLast(1);

                    //Retrieve Oldest Task
                    taskRef.once("value")
                        .then(function(snapshot){
                            if(snapshot.exists()){
                                snapshot.forEach(function(taskSnapshot){
                                    assignedTask = activeTaskClass.db.schema.build(taskSnapshot, 'snapshot');

                                    //Once task data stored in local variable, remove active task
                                    activeTaskClass.db.query.remove(assignedTask)
                                        .then(function(){
                                            deferred.resolve(true)
                                        })
                                        .catch(function(err){deferred.reject(err)})
                                });
                            }else{
                                deferred.resolve(false);
                            }
                        })
                        .catch(function(err){deferred.reject(err)});
                    return deferred.promise;
                },



                /*
                 * Off
                 *
                 * @param - none
                 * @returns - VOID
                 * */

                off: function(){
                    $interval.cancel(articleExtractionInterval);
                    articleExtractionInterval = null;
                    extractionObject = {};
                    assignedTask = {};
                }




            }
        }]);