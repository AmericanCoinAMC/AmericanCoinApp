/**
 * Created by Jess on 30-Oct-16.
 */
app.directive('hashtagPosts',
    ['PostDialogService', '$firebaseArray', 'FeedService',
        function(PostDialogService, $firebaseArray, FeedService){
    return {
        restrict: 'E',
        scope: {
            hashtag: '='
        },
        templateUrl: '/core/common/Hashtag/hashtagPosts.html',
        link: function(scope, element, attrs) {
            if(scope.hashtag != undefined){
                scope.hashtagId = '';
                if(scope.hashtag.$id == undefined){
                    scope.hashtagId = scope.hashtag.id;
                }else{
                    scope.hashtagId = scope.hashtag.$id;
                }
                scope.posts = $firebaseArray(rootRef.child('hashtagPosts/' + scope.hashtagId).limitToFirst(3));
                scope.$watch('hashtag', function(newValue, oldValue) {
                    if(newValue != undefined){
                        scope.hashtag = newValue;
                    }
                }, true);

                scope.displayPost = function(event, postObject){
                    PostDialogService.displayPost(event, postObject);
                };

                scope.displayHashtagFeed = function(event, hashtag){
                    FeedService.loadHashtagFeed(event, hashtag);
                };

            }
        }
    }
}]);