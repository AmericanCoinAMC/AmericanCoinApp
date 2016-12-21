/**
 * Created by Jess on 27-Aug-16.
 */
/**
 * Created by Jess on 31-Jul-16.
 */
app.factory('SourceAtomicUpdates',
    ['$q', 'PostObjectService', 'SourceObjectService',
    function($q, PostObjectService, SourceObjectService){
    return {
        updateSource: function(source){
            var deferred = $q.defer();
            this.getPostsArray(source).then(angular.bind(this, function(postArray){
                this.getUserPostRefs(source).then(angular.bind(this, function(userPostsRefs){
                    this.getSourceAssignmentRefs(source).then(angular.bind(this, function(sourceAssignmentRefs){
                        var refsObject = {
                            mainPostRefs: this.getMainPostRefs(postArray),
                            sourcePostRefs: this.getSourcePostRefs(postArray),
                            categoryPostRefs: this.getCategoryPostRefs(postArray),
                            hashtagPostRefs: this.getHashtagPostRefs(postArray),
                            leaderPostRefs: this.getLeaderPostRefs(postArray),
                            outstandingPostRefs: this.getOutstandingPostRefs(postArray),
                            userPostRefs: userPostsRefs,
                            sourceAssignmentRefs: sourceAssignmentRefs
                        };
                        var fanoutObject = this.buildFanoutObject(source, refsObject, 'edit');
                        rootRef.update(fanoutObject).then(function(){
                            deferred.resolve(true);
                        }).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        deleteSource: function(source){
            var deferred = $q.defer();
            this.getPostsArray(source).then(angular.bind(this, function(postArray){
                this.getUserPostRefsDel(source).then(angular.bind(this, function(userPostsRefs){
                    this.getSourceAssignmentRefs(source).then(angular.bind(this, function(sourceAssignmentRefs){
                        var refsObject = {
                            mainPostRefs: this.getMainPostRefsDel(postArray),
                            sourcePostRefs: this.getSourcePostRefsDel(postArray),
                            categoryPostRefs: this.getCategoryPostRefsDel(postArray),
                            hashtagPostRefs: this.getHashtagPostRefsDel(postArray),
                            leaderPostRefs: this.getLeaderPostRefsDel(postArray),
                            outstandingPostRefs: this.getOutstandingPostRefsDel(postArray),
                            userPostRefs: userPostsRefs,
                            sourceAssignmentRefs: sourceAssignmentRefs
                        };
                        var fanoutObject = this.buildFanoutObject(source, refsObject, 'delete');
                        rootRef.update(fanoutObject).then(function(){
                            deferred.resolve(true);
                        }).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        buildFanoutObject: function(source, refsObject, mode){
            var fanoutObject = {};
            var formattedObject = {};
            if(mode == 'edit'){
                formattedObject = SourceObjectService.buildMinifiedAlt(source);
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

            var userPostRefs = refsObject.userPostRefs;
            for(var i = 0; i < userPostRefs.length; i++){
                fanoutObject[userPostRefs[i]] = formattedObject;
            }

            var sourceAssignmentRefs = refsObject.sourceAssignmentRefs;
            for(var i = 0; i < sourceAssignmentRefs.length; i++){
                fanoutObject[sourceAssignmentRefs[i]] = formattedObject;
            }

            return fanoutObject;
        },

        getPostsArray: function(sourceObject){
            var deferred = $q.defer();
            var sourceRefs = rootRef.child('sourcePosts/' + sourceObject.$id);
            var refsArray = [];
            sourceRefs.once("value").then(function(sourceSnapshot){
                sourceSnapshot.forEach(function(category){
                    category.forEach(function(post){
                        refsArray.push(PostObjectService.buildFromSnapshot(post));
                    });
                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getMainPostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/posts/' + postArray[i].$id + '/source');
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
                refArray.push('/sourcePosts/' + postArray[i].source.id + '/' + postArray[i].category.id + '/' + postArray[i].$id + '/source');
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
                refArray.push('/categoryPosts/' + postArray[i].category.id + '/' + postArray[i].$id + '/source');
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
                    refArray.push('/hashtagPosts/' + postArray[i].primaryHashtag.id + '/' + postArray[i].$id + '/source');
                }
                if(postArray[i].secondaryHashtags != undefined){
                    angular.forEach(postArray[i].secondaryHashtags, function(hashtag, key) {
                        refArray.push('/hashtagPosts/' + key + '/' + postArray[i].$id + '/source');
                    });
                }
            }
            return refArray;
        },

        getHashtagPostRefsDel: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].primaryHashtag){
                    refArray.push('/hashtagPosts/' + postArray[i].primaryHashtag.id + '/' + postArray[i].$id);
                }
                if(postArray[i].secondaryHashtags != undefined){
                    angular.forEach(postArray[i].secondaryHashtags, function(hashtag, key) {
                        refArray.push('/hashtagPosts/' + key + '/' + postArray[i].$id);
                    });
                }
            }
            return refArray;
        },

        getLeaderPostRefs: function(postArray){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].leaders != undefined){
                    angular.forEach(postArray[i].leaders, function(leader) {
                        refArray.push('/leaderPosts/' + leader.id + '/' + postArray[i].$id + '/source');
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
                    refArray.push('/outstandingPosts/' + postArray[i].$id + '/source');
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

        getUserPostRefs: function(source){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userPosts');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(post){
                        if(post.val().source.id == source.$id) {
                            refsArray.push('/userPosts/' + user.key + '/' + post.key + '/source');
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getUserPostRefsDel: function(source){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userPosts');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(post){
                        if(post.val().source.id == source.$id) {
                            refsArray.push('/userPosts/' + user.key + '/' + post.key);
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getSourceAssignmentRefs: function(sourceObject){
            var deferred = $q.defer();
            var refsArray = [];
            var usersRef = rootRef.child('users').orderByChild('isAdmin').equalTo(true);
            usersRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    if(user.val().sourcesAssignments){
                        if(sourceObject.$id in user.val().sourcesAssignments){
                            refsArray.push('users/' + user.key + '/sourcesAssignments/' + sourceObject.$id);
                        }
                    }
                });
                deferred.resolve(refsArray);
            });
            return deferred.promise
        }
    }
}]);