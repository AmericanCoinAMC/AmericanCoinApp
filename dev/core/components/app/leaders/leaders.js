/**
 * Created by Jess on 05-Jun-16.
 */
app.component('leaders', {
    templateUrl: '/core/components/app/leaders/leaders.html',
    bindings: {

    },
    controller: ['$scope', 'LeaderObjectService', function($scope, LeaderObjectService){

        $scope.config = {
            ref: rootRef.child('leaders'),
            objectBuilder: LeaderObjectService,
            templateUrl: '/core/common/Leader/leaderCards.tpl.html',
            firstLotSize: 8,
            nextLotSize: 10,
            wrapper: 'infiniteScroll',
            grid: true,
            gridWidth: 500,
            gutterSize: 30,
            animation: 'zoomInOut-animation',
            deactivators: ['$stateChangeSuccess']
        };
    }]
});