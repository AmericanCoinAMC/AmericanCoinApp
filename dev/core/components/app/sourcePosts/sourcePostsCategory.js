/**
 * Created by Computadora on 23-Dec-16.
 */
/**
 * Created by Jess on 28-Oct-16.
 */

app.component('sourcePostsCategory', {
    template: '<infinite-scroll-wrapper config="config"></infinite-scroll-wrapper>',
    bindings: {

    },
    controller: ['$rootScope','$scope','$stateParams', 'PostObjectService',
        function($rootScope, $scope, $stateParams, PostObjectService){
            $scope.config = {
                ref: rootRef.child('sourcePosts/' + $stateParams.sourceId + '/' + $stateParams.categoryId),
                objectBuilder: PostObjectService,
                templateUrl: '/core/common/Post/postGrid.html',
                grid: true,
                type: 'dynamic'
            };

        }]
});



