/**
 * Created by Jess on 20-Sep-16.
 */
app.factory('TwitterProfileFeed',
    ['$mdDialog',
    function($mdDialog){
    return{
        loadFeed: function(ev, twitterObject){
            $mdDialog.show({
                templateUrl: '/core/common/Feeds/twitterProfile.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true,
                escapeToClose: true,
                locals: {
                    twitterObject: twitterObject
                },
                controller:
                    ['$scope', '$mdDialog', 'twitterObject', '$timeout',
                    function DialogController($scope, $mdDialog, twitterObject, $timeout) {
                    $scope.twitterObject = twitterObject;

                    $scope.loading = true;
                    $timeout(function () {
                        $scope.loading = false;
                    }, 3000);

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

