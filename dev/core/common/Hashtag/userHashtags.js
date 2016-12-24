/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('UserHashtags', ['$firebaseArray', function($firebaseArray){
    var UserHashtags = $firebaseArray.$extend({
        userHasHashtag: function(hashtag){
            if(hashtag){
                var found = false;
                var hashtagId;
                if(hashtag.$id == undefined){
                    hashtagId = hashtag.id
                }else{
                    hashtagId = hashtag.$id
                }
                angular.forEach(this.$list, function(rec){
                    if(hashtagId == rec.$id){
                        found = true;
                    }
                });
                return found;
            }

        }
    });

    return function(ref){
        return new UserHashtags(ref);
    }
}])
    .factory('UserHashtagsService', [
        '$q', '$rootScope', 'HashtagObjectService',
        function($q, $rootScope, HashtagObjectService){
        return{
            addHashtag: function(hashtag){
                var deferred = $q.defer();
                var hashtagId;
                if(hashtag.$id == undefined){
                    hashtagId = hashtag.id
                }else{
                    hashtagId = hashtag.$id
                }
                var ref = rootRef.child('userHashtags/' + $rootScope.userInfo.$id + '/' + hashtagId);
                ref.set(HashtagObjectService.buildMinifiedWithPriority(hashtag)).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            removeHashtag: function(hashtag){
                var deferred = $q.defer();
                var hashtagId;
                if(hashtag.$id == undefined){
                    hashtagId = hashtag.id
                }else{
                    hashtagId = hashtag.$id
                }
                var ref = rootRef.child('userHashtags/' + $rootScope.userInfo.$id + '/' + hashtagId);
                ref.remove().then(function(){
                    deferred.resolve(true);
                }).catch(function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

        }
    }])
    .directive('userHashtagElement', [
        '$rootScope', 'UserHashtags', 'UserHashtagsService',
        function($rootScope, UserHashtags, UserHashtagsService){
        return {
            restrict: 'E',
            scope: {
                hashtag: '='
            },
            templateUrl: '/core/common/Hashtag/userHashtags.html',
            link: function(scope, element, attrs) {
                scope.userHashtags = UserHashtags(rootRef.child('userHashtags/' + $rootScope.userInfo.$id));

                scope.$watch('userHashtags.userHasHashtag(hashtag)', function(newValue, oldValue) {
                    if(newValue != undefined){
                        scope.hasHashtag = newValue;
                    }
                }, true);

                scope.toggleHashtag = function(hashtag){
                    if(scope.userHashtags.userHasHashtag(hashtag)){
                        scope.removeHashtag(hashtag);
                    }else{
                        scope.addHashtag(hashtag);
                    }
                };

                scope.addHashtag = function (hashtag) {
                    UserHashtagsService.addHashtag(hashtag).then(function(){
                    }).catch(function(err){
                        console.log(err);
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                    });
                };

                scope.removeHashtag = function (hashtag) {
                    UserHashtagsService.removeHashtag(hashtag).then(function(){
                    }).catch(function(err){
                        console.log(err);
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                    });
                };
            }
        }
    }]);