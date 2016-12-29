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
                        scope.postsLoaded = false;

                        if(scope.hashtag.$id == undefined){
                            scope.hashtagId = scope.hashtag.id;
                        }else{
                            scope.hashtagId = scope.hashtag.$id;
                        }

                        $firebaseArray(rootRef.child('hashtagPosts/' + scope.hashtagId).limitToFirst(10))
                            .$loaded().then(function(posts){
                                scope.posts = posts;
                                scope.postsLoaded = true;
                            });

                        scope.displayPost = function(event, post){
                            PostDialogService.displayPost(event, post);
                        };

                        scope.$watch('hashtag', function(newValue, oldValue) {
                            if(newValue != undefined){
                                scope.hashtag = newValue;
                            }
                        }, true);
                    }
                }
            }
        }]);