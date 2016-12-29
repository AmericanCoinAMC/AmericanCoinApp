/**
 * Created by Jess on 05-Jun-16.
 */
app.component('leftNavigation', {
    templateUrl: '/core/components/app/layout/leftNavigation.html',
    bindings: {

    },
    controller: [
        '$scope', 'SideNavigation', '$stateParams', '$rootScope', 'UserBookmarks', '$timeout',
        function($scope, SideNavigation, $stateParams, $rootScope, UserBookmarks, $timeout){
            $scope.sourcesExpanded = false;

            $scope.toggleSource = function(){
                $scope.sourcesExpanded = !$scope.sourcesExpanded;
            };

            $scope.displayBookmark = function(ev, type){
                UserBookmarks.load(ev, type);
            };

            $scope.toggleLeft = function(){
                SideNavigation.toggleLeft()
            };

            $scope.close = function () {
                SideNavigation.close('left');
            };
        }]
});