/**
 * Created by Jess on 14-Oct-16.
 */
app.component('newsCategory', {
    template: '<infinite-display-wrapper config="config"></infinite-display-wrappers>',
    bindings: {

    },
    controller: [
        '$rootScope','$scope', 'PostObjectService', '$stateParams',
        function($rootScope, $scope, PostObjectService, $stateParams){

            $scope.config = {
                ref: rootRef.child('categoryPosts/' + $stateParams.categoryId),
                objectBuilder: PostObjectService,
                templateUrl: '/core/common/Post/postGrid.html',
                grid: true,
                wrapper: 'infiniteScroll',
                filters: ['activeSources', 'userIgnoredSources'],
                delayedStart: true,
                animation: 'zoomInOut-animation',
                deactivators: ['$stateChangeSuccess']
            };
        }]
});