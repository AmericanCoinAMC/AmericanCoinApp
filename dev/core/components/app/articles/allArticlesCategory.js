/**
 * Created by Computadora on 08-Feb-17.
 */
app.component('allArticlesCategory', {
    template: '<atomic-array-wrapper config="config"></atomic-array-wrapper>',
    bindings: {

    },
    controller: [
        '$rootScope','$scope', '$stateParams',
        function($rootScope, $scope, $stateParams){

            var articleClass = new Article();

            $scope.markOutstanding = function(item){
                articleClass.markOutstanding(item);
            };

            $scope.config = {
                arrayRef: 'articles/approved/categories/' + $stateParams.categoryId,
                atomicArray: articleClass.db.atomicArray,
                firstLotSize: 26,
                nextLotSize: 16,
                grid: true,
                gridWidth: 250,
                templateUrl: '/core/common/modules/Article/Utilities/articleGrid.html',
                wrapper: 'infiniteScroll',
                delayedStart: true,
                animation: {
                    type: 'entrance',
                    in: 'zoomIn',
                    out: 'zoomOut'
                }
            };
        }]
});