/**
 * Created by Jess on 27-Aug-16.
 */

app.factory('HashtagAtomicUpdates',
    ['$q', 'PostObjectService', 'HashtagObjectService',
    function($q, PostObjectService, HashtagObjectService){
    return {
        updateHashtag: function(hashtag){
            var deferred = $q.defer();
            this.getPostsArray(hashtag).then(angular.bind(this, function(postArray){
                this.getUserHashtagRefs(hashtag).then(angular.bind(this, function(userHashtagRefs){
                    this.getUserPostRefs(hashtag).then(angular.bind(this, function(userPostRefs){
                        var refsObject = {
                            mainPostRefs: this.getMainPostRefs(postArray, hashtag),
                            sourcePostRefs: this.getSourcePostRefs(postArray, hashtag),
                            categoryPostRefs: this.getCategoryPostRefs(postArray, hashtag),
                            hashtagPostRefs: this.getHashtagPostRefs(postArray, hashtag),
                            leaderPostRefs: this.getLeaderPostRefs(postArray, hashtag),
                            outstandingPostRefs: this.getOutstandingPostRefs(postArray, hashtag),
                            userPostRefs: userPostRefs,
                            userHashtagRefs: userHashtagRefs
                        };
                        var fanoutObject = this.buildFanoutObject(hashtag, refsObject, 'edit');
                        rootRef.update(fanoutObject).then(function(){
                            deferred.resolve(true);
                        }).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        deleteHashtag: function(hashtag){
            var deferred = $q.defer();
            this.getPostsArray(hashtag).then(angular.bind(this, function(postArray){
                this.getUserHashtagRefs(hashtag).then(angular.bind(this, function(userHashtagRefs){
                    this.getUserPostRefs(hashtag).then(angular.bind(this, function(userPostRefs){
                        var refsObject = {
                            mainPostRefs: this.getMainPostRefs(postArray, hashtag),
                            sourcePostRefs: this.getSourcePostRefs(postArray, hashtag),
                            categoryPostRefs: this.getCategoryPostRefs(postArray, hashtag),
                            hashtagPostRefs: this.getHashtagPostRefsDel(hashtag),
                            leaderPostRefs: this.getLeaderPostRefs(postArray, hashtag),
                            outstandingPostRefs: this.getOutstandingPostRefs(postArray, hashtag),
                            userPostRefs: userPostRefs,
                            userHashtagRefs: userHashtagRefs
                        };
                        var fanoutObject = this.buildFanoutObject(hashtag, refsObject, 'delete');
                        rootRef.update(fanoutObject).then(function(){
                            deferred.resolve(true);
                        }).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        buildFanoutObject: function(hashtag, refsObject, mode){
            var fanoutObject = {};
            var formattedObject = {};
            if(mode == 'edit'){
                formattedObject = HashtagObjectService.buildMinifiedAlt(hashtag);
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

            var userHashtagRefs = refsObject.userHashtagRefs;
            for(var i = 0; i < userHashtagRefs.length; i++){
                fanoutObject[userHashtagRefs[i]] = formattedObject;
            }

            return fanoutObject;
        },

        getPostsArray: function(hashtagObject){
            var deferred = $q.defer();
            var hashtagRefs = rootRef.child('hashtagPosts/' + hashtagObject.$id);
            var refsArray = [];
            hashtagRefs.once("value").then(function(sourceSnapshot){
                sourceSnapshot.forEach(function(post){
                    refsArray.push(PostObjectService.buildFromSnapshot(post));
                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getMainPostRefs: function(postArray, hashtag){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].primaryHashtag.id == hashtag.$id){
                    refArray.push('/posts/' + postArray[i].$id + '/primaryHashtag');
                }
                if(postArray[i].secondaryHashtags != undefined){
                    if(hashtag.$id in postArray[i].secondaryHashtags){
                        refArray.push('/posts/' + postArray[i].$id + '/secondaryHashtags/' + hashtag.$id);
                    }
                }
            }
            return refArray;
        },

        getSourcePostRefs: function(postArray, hashtag){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].primaryHashtag.id == hashtag.$id){
                    refArray.push('/sourcePosts/' + postArray[i].source.id + '/' + postArray[i].category.id + '/' + postArray[i].$id + '/primaryHashtag');
                }
                if(postArray[i].secondaryHashtags != undefined){
                    if(hashtag.$id in postArray[i].secondaryHashtags){
                        refArray.push('/sourcePosts/' + postArray[i].source.id + '/' + postArray[i].category.id + '/' + postArray[i].$id + '/secondaryHashtags/' + hashtag.$id);
                    }
                }
            }
            return refArray;
        },


        getCategoryPostRefs: function(postArray, hashtag){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].primaryHashtag.id == hashtag.$id){
                    refArray.push('/categoryPosts/' + postArray[i].category.id + '/' + postArray[i].$id + '/primaryHashtag');
                }
                if(postArray[i].secondaryHashtags != undefined){
                    if(hashtag.$id in postArray[i].secondaryHashtags){
                        refArray.push('/categoryPosts/' + postArray[i].category.id + '/' + postArray[i].$id + '/secondaryHashtags/' + hashtag.$id);
                    }
                }
            }
            return refArray;
        },

        getHashtagPostRefs: function(postArray, hashtag){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].primaryHashtag.id == hashtag.$id){
                    refArray.push('/hashtagPosts/' + hashtag.$id + '/' + postArray[i].$id + '/primaryHashtag');
                }
                if(postArray[i].secondaryHashtags != undefined){
                    if(hashtag.$id in postArray[i].secondaryHashtags){
                        refArray.push('/hashtagPosts/' + hashtag.$id + '/' + postArray[i].$id + '/secondaryHashtags/' + hashtag.$id);
                    }
                }
            }
            return refArray;
        },

        getLeaderPostRefs: function(postArray, hashtag){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].leaders != undefined){
                    angular.forEach(postArray[i].leaders, function(leader) {
                        if(postArray[i].primaryHashtag.id == hashtag.$id){
                            refArray.push('/leaderPosts/' + leader.id + '/' + postArray[i].$id + '/primaryHashtag');
                        }
                        if(postArray[i].secondaryHashtags != undefined){
                            if(hashtag.$id in postArray[i].secondaryHashtags){
                                refArray.push('/leaderPosts/' + leader.id + '/' + postArray[i].$id + '/secondaryHashtags/' + hashtag.$id);
                            }
                        }
                    });
                }
            }
            return refArray;
        },

        getHashtagPostRefsDel: function(hashtag){
            return ['/hashtagPosts/' + hashtag.$id];
        },

        getOutstandingPostRefs: function(postArray, hashtag){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].outstanding){
                    if(postArray[i].primaryHashtag.id == hashtag.$id){
                        refArray.push('/outstandingPosts/' + postArray[i].$id + '/primaryHashtag');
                    }
                    if(postArray[i].secondaryHashtags != undefined){
                        if(hashtag.$id in postArray[i].secondaryHashtags){
                            refArray.push('/outstandingPosts/' + postArray[i].$id + '/secondaryHashtags/' + hashtag.$id);
                        }
                    }

                }
            }
            return refArray;
        },

        getUserPostRefs: function(hashtag){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userPosts');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(post){
                        if(post.val().primaryHashtag.id == hashtag.$id) {
                            refsArray.push('/userPosts/' + user.key + '/' + post.key + '/primaryHashtag');
                        }
                        if(post.val().secondaryHashtags != undefined){
                            if(hashtag.$id in post.val().secondaryHashtags){
                                refsArray.push('/userPosts/' + user.key + '/' + post.key + '/secondaryHashtags/' + hashtag.$id);
                            }
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getUserHashtagRefs: function(hashtagObject){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userHashtags');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(hashtag){
                        if(hashtag.key == hashtagObject.$id) {
                            refsArray.push('/userHashtags/' + user.key + '/' + hashtagObject.$id);
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        }
    }
}]);