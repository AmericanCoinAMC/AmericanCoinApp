/**
 * Created by Jess on 14-Oct-16.
 */
app.component('newsCategory', {
    template: '<infinite-scroll-wrapper config="config"></infinite-scroll-wrapper>',
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
                type: 'dynamic'
            };
        }]
});


