/**
 * Created by Jess on 20-Sep-16.
 */
app.factory('LeaderFeed',
    ['$mdDialog', '$rootScope',
        function($mdDialog, $rootScope){
            return{
                loadFeed: function(ev, leader){
                    $mdDialog.show({
                        templateUrl: '/core/common/Feeds/leaderFeed.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:false,
                        fullscreen: true,
                        escapeToClose: false,
                        locals: {
                            leader: leader
                        },
                        controller:
                            ['$rootScope', '$scope', '$mdDialog', 'leader', 'PostObjectService', '$sce',
                                function DialogController($rootScope, $scope, $mdDialog, leader, PostObjectService, $sce) {
                                    $scope.leader = leader;
                                    $scope.selectedIndex = 0;
                                    $rootScope.$broadcast('deactivateInfiniteDisplay');

                                    $scope.$watch('selectedIndex', function(current, old){
                                        if(current != old){

                                        }
                                    });

                                    if(leader.id == undefined) {
                                        $scope.leaderId = leader.$id;
                                    }else{
                                        $scope.leaderId = leader.id;
                                    }

                                    $scope.config = {
                                        firstLotSize: 8,
                                        nextLotSize: 10,
                                        parentContainer: '.dialog-content-scroll',
                                        ref: rootRef.child('leaderPosts/' + $scope.leaderId),
                                        objectBuilder: PostObjectService,
                                        templateUrl: '/core/common/Post/postList.tpl.html',
                                        wrapper: 'infiniteScroll',
                                        filters: ['activeSources'],
                                        deactivators: ['deactivateInfiniteDisplay']
                                    };

                                    twttr.ready(
                                        function (twttr) {
                                            twttr.widgets.load();
                                        }
                                    );

                                    $scope.secureIframeUrl = $sce.trustAsResourceUrl(leader.wikiUrl);
                                    var browserHeight = parseInt(document.body.scrollHeight);
                                    $scope.iframeHeight = browserHeight - 145;

                                    $scope.closeDialog = function() {
                                        $rootScope.$broadcast('deactivateInfiniteDisplay');
                                        $mdDialog.hide();
                                    };
                                }]
                    });
                }
            }
        }]);

