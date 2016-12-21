app.factory('PostDialogService',
    ['$mdDialog',
    function($mdDialog){

    return{
        displayPost: function(ev, postObject){
            $mdDialog.show({
                templateUrl: '/core/common/Post/postDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true,
                escapeToClose: true,
                locals: {
                    postObject: postObject
                },
                controller:
                    ['$scope', '$mdDialog', 'postObject', '$sce',
                    function($scope, $mdDialog, postObject, $sce){
                    $scope.postObject = postObject;
                    $scope.htmlContent = $sce.trustAsHtml(postObject.content);

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