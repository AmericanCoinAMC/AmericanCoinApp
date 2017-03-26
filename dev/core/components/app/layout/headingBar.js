/**
 * Created by Jess on 05-Jun-16.
 */

app.component('headingBar', {
    templateUrl: '/core/components/app/layout/headingBar.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope','SideNavigation',
        function($rootScope, $scope, SideNavigation){

            var userClass = new User();

            $scope.toggleLeftNav = function(){
                SideNavigation.toggle('left');

            };

            $scope.signUserOut = function(){
                userClass.signOut();
            }
        }]
});


