/**
 * Created by Jess on 20-Sep-16.
 */
app.factory('UserBookmarks',
    ['$mdDialog', '$rootScope',
        function($mdDialog, $rootScope){
            return{
                load: function(ev, type){
                    $mdDialog.show({
                        templateUrl: this.getBookmarkTemplate(type),
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: true,
                        escapeToClose: true,
                        locals: {
                            type: type
                        },
                        controller:
                            ['$rootScope', '$scope', '$mdDialog', '$timeout', '$window', 'type',
                                function DialogController($rootScope, $scope, $mdDialog, $timeout, $window, type) {
                                    $scope.type = type;
                                    $scope.delay = 700;
                                    $scope.contentReady = false;

                                    switch($scope.type){
                                        case 'posts':
                                            $scope.bookmarkPosts = $rootScope.bookmarkPosts;
                                            break;
                                        case 'hashtags':
                                            $scope.bookmarkHashtags = $rootScope.bookmarkHashtags;
                                            break;
                                        case 'leaders':
                                            $scope.bookmarkLeaders = $rootScope.bookmarkLeaders;
                                            break;
                                        default:
                                            break;
                                    }

                                    $scope.searching = false;
                                    $scope.searchQuery = '';

                                    $scope.enableSearch = function(){
                                        $scope.searching = true;
                                        $timeout(function() {
                                            var element = $window.document.getElementById('bookmarkSearch');
                                            if(element)
                                                element.focus();
                                        });
                                    };

                                    $scope.disableSearch = function(){
                                        $scope.searching = false;
                                        $scope.searchQuery = '';
                                    };

                                    $scope.closeDialog = function() {
                                        $mdDialog.hide();
                                    };

                                    $scope.setDefaults = function(){
                                        $scope.searching = false;
                                        $scope.searchQuery = '';
                                    };

                                    $timeout(function(){
                                        $scope.contentReady = true;
                                    }, $scope.delay);
                                }]
                    });
                },
                getBookmarkTemplate: function(type){
                    var wrapperUrl = '';
                    if(type == 'posts'){
                        wrapperUrl = '/core/common/Bookmark/postBookmarks.html';
                    }else if(type == 'hashtags'){
                        wrapperUrl = '/core/common/Bookmark/hashtagBookmarks.html';
                    }else if(type == 'leaders'){
                        wrapperUrl = '/core/common/Bookmark/leaderBookmarks.html';
                    }
                    return wrapperUrl;
                }
            }
        }]);
