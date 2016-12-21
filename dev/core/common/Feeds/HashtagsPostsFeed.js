/**
 * Created by Jess on 20-Sep-16.
 */
app.factory('HashtagPostsFeed',
    ['$mdDialog',
        function($mdDialog){
            return{
                loadFeed: function(ev, hashtag){
                    $mdDialog.show({
                        templateUrl: '/core/common/Feeds/hashtagPosts.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: true,
                        escapeToClose: true,
                        locals: {
                            hashtag: hashtag
                        },
                        controller:
                            ['$rootScope', '$scope', '$mdDialog', '$firebaseArray', 'PostDialogService', '$timeout', 'hashtag', 'PostObjectService',
                                function DialogController($rootScope, $scope, $mdDialog, $firebaseArray, PostDialogService, $timeout, hashtag, PostObjectService) {
                                    $scope.hashtag = hashtag;
                                    if(hashtag.id == undefined) {
                                        $scope.hashtagId = hashtag.$id;
                                    }else{
                                        $scope.hashtagId = hashtag.id;
                                    }

                                    $scope.config = {
                                        ref: rootRef.child('hashtagPosts/' + $scope.hashtagId),
                                        objectBuilder: PostObjectService,
                                        templateUrl: '/core/common/Post/postList.html',
                                        parentContainer: '.dialog-content-scroll'
                                    };

                                    $scope.closeDialog = function() {
                                        $mdDialog.hide();
                                    };
                                }]
                    });
                }
            }
        }]);

