/**
 * Created by Jess on 20-Sep-16.
 */
app.factory('HashtagPostsFeed',
    ['$mdDialog', '$rootScope',
        function($mdDialog, $rootScope){
            return{
                loadFeed: function(ev, hashtag){
                    $mdDialog.show({
                        templateUrl: '/core/common/Feeds/hashtagPosts.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:false,
                        fullscreen: true,
                        escapeToClose: false,
                        locals: {
                            hashtag: hashtag
                        },
                        controller:
                            ['$rootScope', '$scope', '$mdDialog', 'hashtag', 'PostObjectService',
                                function DialogController($rootScope, $scope, $mdDialog, hashtag, PostObjectService) {
                                    $scope.hashtag = hashtag;
                                    $rootScope.$broadcast('deactivateInfiniteDisplay');

                                    if(hashtag.id == undefined) {
                                        $scope.hashtagId = hashtag.$id;
                                    }else{
                                        $scope.hashtagId = hashtag.id;
                                    }

                                    $scope.config = {
                                        parentContainer: '.dialog-content-scroll',
                                        ref: rootRef.child('hashtagPosts/' + $scope.hashtagId),
                                        firstLotSize: 8,
                                        nextLotSize: 10,
                                        objectBuilder: PostObjectService,
                                        templateUrl: '/core/common/Post/postList.tpl.html',
                                        wrapper: 'infiniteScroll',
                                        filters: ['activeSources'],
                                        deactivators: ['deactivateInfiniteDisplay']
                                    };

                                    $scope.closeDialog = function() {
                                        $rootScope.$broadcast('deactivateInfiniteDisplay');
                                        $mdDialog.hide();
                                    };
                                }]
                    });
                }
            }
        }]);

