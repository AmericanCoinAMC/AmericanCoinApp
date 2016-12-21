/**
 * Created by Jess on 27-Aug-16.
 */
/**
 * Created by Jess on 31-Jul-16.
 */
app.factory('LeaderAtomicUpdates',
    ['$q', 'PostObjectService', 'LeaderObjectService',
    function($q, PostObjectService, LeaderObjectService){
    return {
        updateLeader: function(leader){
            var deferred = $q.defer();
            this.getPostsArray(leader).then(angular.bind(this, function(postArray){
                this.getUserPostRefs(leader).then(angular.bind(this, function(userPostsRefs){
                    var refsObject = {
                        mainPostRefs: this.getMainPostRefs(postArray, leader),
                        sourcePostRefs: this.getSourcePostRefs(postArray, leader),
                        categoryPostRefs: this.getCategoryPostRefs(postArray, leader),
                        hashtagPostRefs: this.getHashtagPostRefs(postArray, leader),
                        leaderPostRefs: this.getLeaderPostRefs(postArray, leader),
                        outstandingPostRefs: this.getOutstandingPostRefs(postArray, leader),
                        userPostRefs: userPostsRefs
                    };
                    var fanoutObject = this.buildFanoutObject(leader, refsObject, 'edit');
                    rootRef.update(fanoutObject).then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        deleteLeader: function(leader){
            var deferred = $q.defer();
            this.getPostsArray(leader).then(angular.bind(this, function(postArray){
                this.getUserPostRefs(leader).then(angular.bind(this, function(userPostsRefs){
                    var refsObject = {
                        mainPostRefs: this.getMainPostRefs(postArray, leader),
                        sourcePostRefs: this.getSourcePostRefs(postArray, leader),
                        categoryPostRefs: this.getCategoryPostRefs(postArray, leader),
                        hashtagPostRefs: this.getHashtagPostRefs(postArray, leader),
                        leaderPostRefs: this.getLeaderPostRefs(postArray, leader),
                        outstandingPostRefs: this.getOutstandingPostRefs(postArray, leader),
                        userPostRefs: userPostsRefs
                    };
                    var fanoutObject = this.buildFanoutObject(leader, refsObject, 'delete');
                    rootRef.update(fanoutObject).then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
            })).catch(function(err){deferred.reject(err);});
            return deferred.promise;
        },

        buildFanoutObject: function(leader, refsObject, mode){
            var fanoutObject = {};
            var formattedObject = {};
            if(mode == 'edit'){
                formattedObject = LeaderObjectService.buildMinifiedAlt(leader);
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

            return fanoutObject;
        },

        getPostsArray: function(leaderObject){
            var deferred = $q.defer();
            var leaderRefs = rootRef.child('leaderPosts/' + leaderObject.$id);
            var refsArray = [];
            leaderRefs.once("value").then(function(sourceSnapshot){
                sourceSnapshot.forEach(function(post){
                    refsArray.push(PostObjectService.buildFromSnapshot(post));
                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        },

        getMainPostRefs: function(postArray, leader){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/posts/' + postArray[i].$id + '/leaders/' + leader.$id);
            }
            return refArray;
        },


        getSourcePostRefs: function(postArray, leader){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/sourcePosts/' + postArray[i].source.id + '/' + postArray[i].category.id + '/' + postArray[i].$id + '/leaders/' + leader.$id);
            }
            return refArray;
        },

        getCategoryPostRefs: function(postArray, leader){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                refArray.push('/categoryPosts/' + postArray[i].category.id + '/' + postArray[i].$id + '/leaders/' + leader.$id);
            }
            return refArray;
        },

        getHashtagPostRefs: function(postArray, leader){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].primaryHashtag != undefined && postArray[i].primaryHashtag.id != undefined){
                    refArray.push('/hashtagPosts/' + postArray[i].primaryHashtag.id + '/' + postArray[i].$id + '/leaders/' + leader.$id);
                    if(postArray[i].secondaryHashtags != undefined){
                        angular.forEach(postArray[i].secondaryHashtags, function(secondaryHashtag) {
                            refArray.push('/hashtagPosts/' + secondaryHashtag.id + '/' + postArray[i].$id + '/leaders/' + leader.$id);
                        });
                    }
                }
            }
            return refArray;
        },

        getLeaderPostRefs: function(postArray, leader){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                angular.forEach(postArray[i].leaders, function(leader) {
                    refArray.push('/leaderPosts/' + leader.id + '/' + postArray[i].$id + '/leaders/' + leader.$id);
                });
            }
            return refArray;
        },

        getOutstandingPostRefs: function(postArray, leader){
            var refArray = [];
            for(var i = 0; i < postArray.length; i++){
                if(postArray[i].outstanding){
                    refArray.push('/outstandingPosts/' + postArray[i].$id + '/leaders/' + leader.$id);
                }
            }
            return refArray;
        },

        getUserPostRefs: function(leader){
            var deferred = $q.defer();
            var userPostsRef = rootRef.child('userPosts');
            var refsArray = [];
            userPostsRef.once("value").then(function(snapshot){
                snapshot.forEach(function(user){
                    user.forEach(function(post){
                        if(leader.$id in post.val().leaders){
                            refsArray.push('/userPosts/' + user.key + '/' + post.key + '/leaders/' + leader.$id);
                        }
                    });

                });
                deferred.resolve(refsArray);
            });
            return deferred.promise;
        }
    }
}]);