/**
 * Created by Jess on 05-Jun-16.
 */
app.component('hashtags', {
    templateUrl: '/core/components/app/hashtags/hashtags.html',
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
            deactivators: ['$stateChangeSuccess']
        };
    }]
});