/**
 * Created by Jess on 05-Jun-16.
 */
app.component('leftNavigation', {
    templateUrl: '/core/components/app/layout/leftNavigation.html',
    bindings: {

    },
    controller: ['$scope', 'SideNavigation', function($scope, SideNavigation){


        $scope.toggleLeft = function(){
            SideNavigation.toggleLeft()
        };

        $scope.close = function () {
            SideNavigation.close('left');
        };
    }]
});