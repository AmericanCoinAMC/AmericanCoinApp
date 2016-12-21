/**
 * Created by Jess on 31-Jul-16.
 */
app.factory('CategoryAtomicUpdates',
    ['$q', 'PostObjectService', 'CategoryObjectService',
    function($q, PostObjectService, CategoryObjectService){
    return {


        updateCategory: function(category){
            var deferred = $q.defer();
            this.getPostsArray(category).then(angular.bind(this, function(postArray){
                this.getUserPostRefs(category).then(angular.bind(this, function(userPostsRefs){
                    this.getSourceCategoryRefs(category).then(angular.bind(this, function(sourceCategoryRefs){
                        var refsObject = {
                            mainPostRefs: this.getMainPostRefs(postArray),
                            sourcePostRefs: this.getSourcePostRefs(postArray),
                            categoryPostRefs: this.getCategoryPostRefs(postArray),
                            hashtagPostRefs: this.getHashtagPostRefs(postArray),
                            leaderPostRefs: this.getLeaderPostRefs(postArray),
                            outstandingPostRefs: this.getOutstandingPostRefs(postArray),
                            sourceCategoryRefs: sourceCategoryRefs,
                            userPostRefs: userPostsRefs
                        };
                        var fanoutObject = this.buildFanoutObject(category, refsObject, 'edit');
                        rootRef.update(fanoutObject).then(function(){
                            deferred.resolve(true);
                        }).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        deleteCategory: function(category){
            var deferred = $q.defer();
            this.getPostsArray(category).then(angular.bind(this, function(postArray){
                this.getUserPostRefsDel(category).then(angular.bind(this, function(userPostsRefs){
                    this.getSourceCategoryRefsDel(category).then(angular.bind(this, function(sourceCategoryRefs){
                        var refsObject = {
                            mainPostRefs: this.getMainPostRefsDel(postArray),
                            sourcePostRefs: this.getSourcePostRefsDel(postArray),
                            categoryPostRefs: this.getCategoryPostRefsDel(postArray),
                            hashtagPostRefs: this.getHashtagPostRefsDel(postArray),
                            leaderPostRefs: this.getLeaderPostRefsDel(postArray),
                            outstandingPostRefs: this.getOutstandingPostRefsDel(postArray),
                            sourceCategoryRefs: sourceCategoryRefs,
                            userPostRefs: userPostsRefs
                        };
                        var fanoutObject = this.buildFanoutObject(category, refsObject, 'delete');
                        rootRef.update(fanoutObject).then(function(){
                            deferred.resolve(true);
                        }).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        buildFanoutObject: function(category, refsObject, mode){
            var fanoutObject = {};
            var formattedObject = {};
            if(mode == 'edit'){
                formattedObject = CategoryObjectService.buildMinifiedAlt(category);
            }
            var mainPostRefs = refsObject.mainPostRefs;
            for(var i = 0; i < mainPostRefs.length; i++){
                fanoutObject[mainPostRefs[i]] = formattedObject;
            }

            var sourcePostRefs = refsObject.sourcePostRefs;
            for(var i = 0; i < sourcePostRefs.length; i++){
                fanoutObject[sourcePostRefs[i]] = formattedObject;
            }

            var categoryPostRefs = refsObject.categoryPostRefs;
            for(var i = 0; i < categoryPostRefs.length; i++){
                fanoutObject[categoryPostRefs[i]] = formattedObject;
            }

            var hashtagPostRefs = refsObject.hashtagPostRefs;
            for(var i = 0; i < hashtagPostRefs.length; i++){
                fanoutObject[hashtagPostRefs[i]] = formattedObject;
            }

            var leaderPostRefs = refsObject.leaderPostRefs;
            for(var i = 0; i < leaderPostRefs.length; i++){
                fanoutObject[leaderPostRefs[i]] = formattedObject;
            }

            var outstandingPostRefs = refsObject.outstandingPostRefs;
            for(var i = 0; i < outstandingPostRefs.length; i++){
                fanoutObject[outstandingPostRefs[i]] = formattedObject;
            }

            var sourceCategoryRefs = refsObject.sourceCategoryRefs;
            for(var i = 0; i < sourceCategoryRefs.length; i++){
                fanoutObject[sourceCategoryRefs[i]] = formattedObject;
            }

            var userPostRefs = refsObject.userPostRefs;
            for(var i = 0; i < userPostRefs.length; i++){
                fanoutObject[userPostRefs[i]] = formattedObject;
            }

            return fanoutObject;
        },

        getPostsArray: function(categoryObject){
            var deferred = $q.defer();
            var categoryRefs = rootRef.child('categoryPosts/' + categoryObject.$id);
            var refsArray = [];
            categoryRefs.once("value").then(function(sourceSnapshot){
                sourceSnapshot.forEach(function(post){
                    refsArray.push(PostObjectService.buildFromSnapshot(post));
                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getMainPostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/posts/' + postArray[i].$id + '/category');
            }
            return refArray;
        },

        getMainPostRefsDel: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/posts/' + postArray[i].$id);
            }
            return refArray;
        },

        getSourcePostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/sourcePosts/' + postArray[i].source.id + '/' + postArray[i].category.id + '/' + postArray[i].$id + '/category');
            }
            return refArray;
        },

        getSourcePostRefsDel: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/sourcePosts/' + postArray[i].source.id + '/' + postArray[i].category.id + '/' + postArray[i].$id);
            }
            return refArray;
        },

        getCategoryPostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/categoryPosts/' + postArray[i].category.id + '/' + postArray[i].$id + '/category');
            }
            return refArray;
        },

        getCategoryPostRefsDel: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/categoryPosts/' + postArray[i].category.id + '/' + postArray[i].$id);
            }
            return refArray;
        },

        getHashtagPostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].primaryHashtag){
                    refArray.push('/hashtagPosts/' + postArray[i].primaryHashtag.id + '/' + postArray[i].$id + '/category');
                }
                if(postArray[i].secondaryHashtags != undefined){
                    angular.forEach(postArray[i].secondaryHashtags, function(hashtag, key) {
                        refArray.push('/hashtagPosts/' + key + '/' + postArray[i].$id + '/category');
                    });
                }
            }
            return refArray;
        },

        getHashtagPostRefsDel: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].hashtag){
                    if(postArray[i].primaryHashtag){
                        refArray.push('/hashtagPosts/' + postArray[i].primaryHashtag.id + '/' + postArray[i].$id);
                    }
                    if(postArray[i].secondaryHashtags != undefined){
                        angular.forEach(postArray[i].secondaryHashtags, function(hashtag, key) {
                            refArray.push('/hashtagPosts/' + key + '/' + postArray[i].$id);
                        });
                    }
                }
            }
            return refArray;
        },

        getLeaderPostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].leaders != undefined){
                    angular.forEach(postArray[i].leaders, function(leader) {
                        refArray.push('/leaderPosts/' + leader.id + '/' + postArray[i].$id + '/category');
                    });
                }
            }
            return refArray;
        },

        getLeaderPostRefsDel: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].leaders != undefined){
                    angular.forEach(postArray[i].leaders, function(leader) {
                        refArray.push('/leaderPosts/' + leader.id + '/' + postArray[i].$id);
                    });
                }
            }
            return refArray;
        },

        getOutstandingPostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].outstanding){
                    refArray.push('/outstandingPosts/' + postArray[i].$id + '/category');
                }
            }
            return refArray;
        },

        getOutstandingPostRefsDel: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].outstanding){
                    refArray.push('/outstandingPosts/' + postArray[i].$id);
                }
            }
            return refArray;
        },

        getUserPostRefs: function(category){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userPosts');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(post){
                        if(post.val().category.id == category.$id) {
                            refsArray.push('/userPosts/' + user.key + '/' + post.key + '/category');
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getUserPostRefsDel: function(category){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userPosts');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(post){
                        if(post.val().category.id == category.$id) {
                            refsArray.push('/userPosts/' + user.key + '/' + post.key);
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getSourceCategoryRefs: function(categoryObject){
            var deferred = $q.defer();
            var refsArray = [];
            var sourceCategoriesRef = rootRef.child('sourcesCategories');
            sourceCategoriesRef.once("value").then(function(snapshot){
                snapshot.forEach(function(source){
                    if(source.val()){
                        if(categoryObject.$id in source.val()){
                            refsArray.push('sourcesCategories/' + source.key + '/' + categoryObject.$id + '/details');
                        }
                    }
                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getSourceCategoryRefsDel: function(categoryObject){
            var deferred = $q.defer();
            var refsArray = [];
            var sourceCategoriesRef = rootRef.child('sourcesCategories');
            sourceCategoriesRef.once("value").then(function(snapshot){
                snapshot.forEach(function(source){
                    if(source.val()){
                        if(categoryObject.$id in source.val()){
                            refsArray.push('sourcesCategories/' + source.key + '/' + categoryObject.$id);
                        }
                    }
                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        }
    }
}]);