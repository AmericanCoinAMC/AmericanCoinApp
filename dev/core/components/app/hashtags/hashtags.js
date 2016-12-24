/**
 * Created by Jess on 05-Jun-16.
 */
app.component('hashtags', {
    templateUrl: '/core/components/app/hashtags/hashtags.html',
    bindings: {

    },
    controller: ['$scope', 'HashtagObjectService', function($scope, HashtagObjectService){

        $scope.config = {
            gridWidth: 500,
            ref: rootRef.child('hashtags'),
            objectBuilder: HashtagObjectService,
            templateUrl: '/core/common/Hashtag/hashtagCards.tpl.html',
            grid: true,
            type: 'dynamic'
        };

    }]
});