/**
 * Created by Jess on 05-Jun-16.
 */
app.component('hashtags', {
    templateUrl: '/core/components/app/hashtags/users.html',
    bindings: {

    },
    controller: ['$scope', 'HashtagObjectService', function($scope, HashtagObjectService){

        $scope.config = {
            ref: rootRef.child('hashtags'),
            objectBuilder: HashtagObjectService,
            firstLotSize: 8,
            nextLotSize: 10,
            templateUrl: '/core/common/Hashtag/hashtagCards.tpl.html',
            wrapper: 'infiniteScroll',
            delayedStart: true,
            animation: 'zoomIn-animation',
            deactivators: ['$stateChangeSuccess']
        };
    }]
});