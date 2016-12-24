/**
 * Created by Jess on 15-Oct-16.
 */
app.component('sourcesNav', {
    templateUrl: '/core/components/app/layout/sourcesNav.html',
    bindings: {

    },
    controller: ['$rootScope', '$scope', '$timeout', 'SourceObjectService', function($rootScope, $scope, $timeout, SourceObjectService){
        $scope.sourceExpanded = false;


        $scope.toggleSourceNav = function(){
            if($scope.sourceExpanded){
                $scope.sourceExpanded = false;
            }else{
                $scope.sourceExpanded = true;
            }
        };

        $scope.config = {
            firstLotSize: 3,
            nextLotSize: 5,
            ref: rootRef.child('sources'),
            objectBuilder: SourceObjectService,
            templateUrl: '/core/components/app/layout/sourcesNav.tpl.html',
            type: 'static'
        };

    }]
});