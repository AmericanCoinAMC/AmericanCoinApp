/**
 * Created by Jess on 30-Oct-16.
 */
app.directive('leaderPosts',
    ['PostDialogService', '$firebaseArray', 'FeedService',
        function(PostDialogService, $firebaseArray, FeedService){
            return {
                restrict: 'E',
                scope: {
                    leader: '='
                },
                templateUrl: '/core/common/Leader/leaderPosts.html',
                link: function(scope, element, attrs) {
                    if(scope.leader != undefined){
                        scope.leaderId = '';
                        scope.postsLoaded = false;

                        if(scope.leader.$id == undefined){
                            scope.leaderId = scope.leader.id;
                        }else{
                            scope.leaderId = scope.leader.$id;
                        }

                        $firebaseArray(rootRef.child('leaderPosts/' + scope.leaderId).limitToFirst(10))
                            .$loaded().then(function(posts){
                                scope.posts = posts;
                                scope.postsLoaded = true;
                            });

                        scope.displayPost = function(event, post){
                            PostDialogService.displayPost(event, post);
                        };

                        scope.$watch('leader', function(newValue, oldValue) {
                            if(newValue != undefined){
                                scope.leader = newValue;
                            }
                        }, true);
                    }
                }
            }
        }]);