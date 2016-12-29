/**
 * Created by Computadora on 03-Dec-16.
 */

app.directive('postHashtags',
    ['FeedService', '$mdBottomSheet', '$timeout',
        function(FeedService, $mdBottomSheet, $timeout){
            return {
                restrict: 'E',
                scope: {
                    post: '='
                },
                templateUrl: '/core/common/Post/postHashtags.html',
                link: function(scope, element, attrs) {
                    scope.truncate = attrs.truncate || false;
                    scope.displayHashtagFeed = function(event, hashtag){
                        if(scope.post.secondaryHashtags){
                            $mdBottomSheet.show({
                                templateUrl: '/core/common/Post/postHashtagBottomSheet.html',
                                escapeToClose: true,
                                disableBackdrop: false,
                                clickOutsideToClose: true,
                                disableParentScroll: false,
                                locals: {
                                    post: scope.post
                                },
                                controller:
                                    ['$scope', '$mdBottomSheet', 'post',
                                        function($scope, $mdBottomSheet, post){
                                            $scope.post = post;

                                            $scope.displayFeed = function(hashtag) {
                                                $mdBottomSheet.hide();
                                                $timeout(function(){
                                                    FeedService.loadHashtagFeed(event, hashtag);
                                                }, 500);
                                            };
                                            $scope.hide = function(){
                                                $mdBottomSheet.hide();
                                            };

                                        }]
                            }).then(function(clickedItem) {

                            });
                        }else{
                            FeedService.loadHashtagFeed(event, hashtag);
                        }
                    };


                    /*
                     * Watchers
                     * */

                    scope.$watch('post', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.post = newValue;
                        }
                    }, true);

                }
            }
        }]);