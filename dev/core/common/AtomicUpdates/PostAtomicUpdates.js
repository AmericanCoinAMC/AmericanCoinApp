/**
 * Created by Jess on 27-Aug-16.
 */



app.factory('PostAtomicUpdates',
    ['$q', 'PostObjectService',
    function($q, PostObjectService){
    return {
        updatePost: function(postObject){
            var deferred = $q.defer();
            var fanoutObject = {};

            var formattedObject = PostObjectService.buildMinified(postObject);

            this.getUserPostRefs(postObject).then(angular.bind(this, function(userPostRefs){
                for(var i = 0; i < userPostRefs.length; i++){
                    fanoutObject[userPostRefs[i]] = formattedObject;
                }

                fanoutObject['/sourcePosts/' + postObject.source.id + '/' + postObject.category.id + '/' + postObject.$id] = formattedObject;
                fanoutObject['/categoryPosts/' + postObject.category.id + '/' + postObject.$id] = formattedObject;

                if(postObject.outstanding){
                    fanoutObject['/outstandingPosts/' + postObject.$id] = formattedObject;
                }else{
                    this.deleteOutstandingPost(postObject);
                }

                if(postObject.primaryHashtag){
                    this.deleteUnselectedHashtagPosts(postObject);
                    fanoutObject['/hashtagPosts/' + postObject.primaryHashtag.id + '/' + postObject.$id] = formattedObject;
                    if(postObject.secondaryHashtags != undefined){
                        angular.forEach(postObject.secondaryHashtags, function(hashtag, key) {
                            fanoutObject['/hashtagPosts/' + key + '/' + postObject.$id] = formattedObject;
                        });
                    }
                }else{
                    this.deleteHashtagPosts(postObject);
                }

                if(postObject.leaders){
                    this.deleteUnselectedLeaderPosts(postObject);
                    angular.forEach(postObject.leaders, function(leader, key) {
                        fanoutObject['/leaderPosts/' + key + '/' + postObject.$id] = formattedObject;
                    });
                }else{
                    this.deleteLeaderPosts(postObject);
                }

                rootRef.update(fanoutObject).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err)});

            return deferred.promise;
        },

        deletePost: function(postObject){
            var deferred = $q.defer();
            var fanoutObject = {};
            this.getUserPostRefs(postObject).then(angular.bind(this, function(userPostRefs){
                for(var i = 0; i < userPostRefs.length; i++){
                    fanoutObject[userPostRefs[i]] = {};
                }

                fanoutObject['/sourcePosts/' + postObject.source.id + '/' + postObject.category.id + '/' + postObject.$id] = {};
                fanoutObject['/categoryPosts/' + postObject.category.id + '/' + postObject.$id] = {};

                if(postObject.outstanding){
                    fanoutObject['/outstandingPosts/' + postObject.$id] = {};
                }

                if(postObject.primaryHashtag){
                    fanoutObject['/hashtagPosts/' + postObject.primaryHashtag.id + '/' + postObject.$id] = {};
                    if(postObject.secondaryHashtags != undefined){
                        angular.forEach(postObject.secondaryHashtags, function(hashtag, key) {
                            fanoutObject['/hashtagPosts/' + key + '/' + postObject.$id] = {};
                        });
                    }
                }

                if(postObject.leaders){
                    angular.forEach(postObject.leaders, function(leader, key) {
                        fanoutObject['/leaderPosts/' + key + '/' + postObject.$id] = {};
                    });
                }

                rootRef.update(fanoutObject).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err)});
            return deferred.promise;
        },

        getUserPostRefs: function(postObject){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userPosts');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(post){
                        if(post.key == postObject.$id) {
                            refsArray.push('/userPosts/' + user.key + '/' + post.key);
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },




        /*
        * Update Posts's Helpers
        * */

        deleteOutstandingPost: function(postObject){
            var deferred = $q.defer();
            var outstandingPostsRef = rootRef.child('outstandingPosts/' + postObject.$id);
            outstandingPostsRef.remove().then(function(){
                deferred.resolve(true);
            }).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        deleteHashtagPosts: function(postObject){
            var deferred = $q.defer();
            var fanoutObject = {};
            var hashtagsRef = rootRef.child('hashtagPosts/');
            hashtagsRef.once('value').then(function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                    fanoutObject['/hashtagPosts/' + childSnapshot.key + '/' + postObject.$id] = {};
                });
                rootRef.update(fanoutObject).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){deferred.reject(err);});

            });
            return deferred.promise;
        },


        deleteUnselectedHashtagPosts: function(postObject){
            var deferred = $q.defer();
            var fanoutObject = {};
            if(postObject.secondaryHashtags == null || postObject.secondaryHashtags == undefined){
                postObject.secondaryHashtags = {};
            }
            var hashtagsRef = rootRef.child('hashtagPosts/');
            hashtagsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(hashtag){
                    if(hashtag.key != postObject.primaryHashtag.id && !(hashtag.key in postObject.secondaryHashtags)){
                        fanoutObject['/hashtagPosts/' + hashtag.key + '/' + postObject.$id] = {};
                    }
                });
                rootRef.update(fanoutObject).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){deferred.reject(err);});
            });
            return deferred.promise;
        },

        deleteLeaderPosts: function(postObject){
            var deferred = $q.defer();
            var fanoutObject = {};
            var leadersRef = rootRef.child('leaderPosts/');
            leadersRef.once('value').then(function(snapshot){
                snapshot.forEach(function(leader) {
                    fanoutObject['/leaderPosts/' + leader.key + '/' + postObject.$id] = {};
                });
                rootRef.update(fanoutObject).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){deferred.reject(err);});

            });
            return deferred.promise;
        },

        deleteUnselectedLeaderPosts: function(postObject){
            var deferred = $q.defer();
            var fanoutObject = {};
            if(postObject.leaders == null || postObject.leaders == undefined){
                postObject.leaders = {};
            }
            var leadersRef = rootRef.child('leaderPosts/');
            leadersRef.once("value").then(function(snapshot){
                snapshot.forEach(function(leader){
                    if(!(leader.key in postObject.leaders)){
                        fanoutObject['/leaderPosts/' + leader.key + '/' + postObject.$id] = {};
                    }
                });
                rootRef.update(fanoutObject).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){deferred.reject(err);});
            });
            return deferred.promise;
        }
    }
}]);