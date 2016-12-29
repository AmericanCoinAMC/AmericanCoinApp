app.factory('PostDialogService',
    ['$mdDialog',
        function($mdDialog){

            return{
                displayPost: function(ev, post){
                    $mdDialog.show({
                        templateUrl: '/core/common/Post/postDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: true,
                        escapeToClose: true,
                        locals: {
                            post: post
                        },
                        controller:
                            ['$scope', '$mdDialog', 'post', '$sce',
                                function($scope, $mdDialog, post, $sce){
                                    $scope.post = post;
                                    $scope.htmlContent = $sce.trustAsHtml(post.content);

                                    twttr.ready(
                                        function (twttr) {
                                            twttr.widgets.load();
                                        }
                                    );

                                    $scope.closeDialog = function() {
                                        $mdDialog.hide();
                                    }
                                }]
                    });
                }
            }
        }]);