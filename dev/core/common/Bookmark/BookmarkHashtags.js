/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('BookmarkHashtags', ['$firebaseArray', function($firebaseArray){
    var BookmarkHashtags = $firebaseArray.$extend({

        isBookmarked: function(hashtag){
            if(hashtag){
                var hashtagId = hashtag.$id || hashtag.id;
                var found = false;
                angular.forEach(this.$list, function(rec){
                    if(hashtagId == rec.$id){
                        found = true;
                    }
                });
                return found;
            }
        },

        getTotal: function(){
            var items = 0;
            angular.forEach(this.$list, function(rec){
                items += 1;
            });
            return items;
        }
    });

    return function(ref){
        return new BookmarkHashtags(ref);
    }
}])
    .factory('BookmarkHashtagsService', [
        '$q', '$rootScope', 'HashtagObjectService',
        function($q, $rootScope, HashtagObjectService){
            return{
                addHashtag: function(hashtag){
                    var deferred = $q.defer();
                    var ref = rootRef.child('bookmarkedHashtags/' + $rootScope.userInfo.$id + '/' + this.getElementId(hashtag));
                    ref.set(HashtagObjectService.buildMinified(hashtag)).then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                removeHashtag: function(hashtag){
                    var deferred = $q.defer();
                    var ref = rootRef.child('bookmarkedHashtags/' + $rootScope.userInfo.$id + '/' + this.getElementId(hashtag));
                    ref.remove().then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                getElementId: function(hashtag){
                    return hashtag.$id || hashtag.id;
                }

            }
        }])
    .directive('bookmarkHashtagElement', [
        '$rootScope', 'BookmarkHashtagsService',
        function($rootScope, BookmarkHashtagsService){
            return {
                restrict: 'E',
                scope: {
                    hashtag: '='
                },
                templateUrl: '/core/common/Bookmark/bookmark.html',
                link: function(scope, element, attrs) {
                    scope.isBookmarked = false;
                    scope.bookmarkHashtags = $rootScope.bookmarkHashtags;

                    scope.$watch('bookmarkHashtags.isBookmarked(hashtag)', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.isBookmarked = newValue;
                        }
                    }, true);

                    scope.$watch('hashtag', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.hashtag = newValue;
                        }
                    }, true);

                    scope.toggle = function(){
                        if(scope.isBookmarked){
                            BookmarkHashtagsService.removeHashtag(scope.hashtag);
                        }else{
                            BookmarkHashtagsService.addHashtag(scope.hashtag);
                        }
                    };
                }
            }
        }]);