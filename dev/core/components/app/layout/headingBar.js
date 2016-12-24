/**
 * Created by Jess on 05-Jun-16.
 */

app.component('headingBar', {
    templateUrl: '/core/components/app/layout/headingBar.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope','UserService','SideNavigation','FeedService','$timeout','$mdBottomSheet',
        function($rootScope, $scope, UserService, SideNavigation, FeedService, $timeout, $mdBottomSheet){
        $scope.toggleLeftNav = function(){
            SideNavigation.toggle('left');

        };

        $scope.signUserOut = function(){
            UserService.signOut();
        }
    }]
});


