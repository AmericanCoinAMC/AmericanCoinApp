/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('BookmarkPosts', ['$firebaseArray', function($firebaseArray){
    var BookmarkPosts = $firebaseArray.$extend({

        isBookmarked: function(post){
            if(post){
                var found = false;
                angular.forEach(this.$list, function(rec){
                    if(post.$id == rec.$id){
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
        return new BookmarkPosts(ref);
    }
}])
    .factory('BookmarkPostsService', [
        '$q', '$rootScope', 'PostObjectService',
        function($q, $rootScope, PostObjectService){
            return{
                addPost: function(post){
                    var deferred = $q.defer();
                    var ref = rootRef.child('bookmarkedPosts/' + $rootScope.userInfo.$id + '/' + post.$id);
                    ref.set(PostObjectService.buildMinified(post)).then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                removePost: function(post){
                    var deferred = $q.defer();
                    var ref = rootRef.child('bookmarkedPosts/' + $rootScope.userInfo.$id + '/' + post.$id);
                    ref.remove().then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }

            }
        }])
    .directive('bookmarkPostElement', [
        '$rootScope', 'BookmarkPostsService',
        function($rootScope, BookmarkPostsService){
            return {
                restrict: 'E',
                scope: {
                    post: '='
                },
                templateUrl: '/core/common/Bookmark/bookmark.html',
                link: function(scope, element, attrs) {
                    scope.isBookmarked = false;
                    scope.bookmarkPosts = $rootScope.bookmarkPosts;

                    scope.$watch('bookmarkPosts.isBookmarked(post)', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.isBookmarked = newValue;
                        }
                    }, true);

                    scope.$watch('post', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.post = newValue;
                        }
                    }, true);

                    scope.toggle = function(){
                        if(scope.isBookmarked){
                            BookmarkPostsService.removePost(scope.post);
                        }else{
                            BookmarkPostsService.addPost(scope.post);
                        }
                    };
                }
            }
        }]);