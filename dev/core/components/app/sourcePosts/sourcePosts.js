/**
 * Created by Jess on 28-Oct-16.
 */

app.component('sourcePosts', {
    templateUrl: '/core/components/app/sourcePosts/sourcePosts.html',
    bindings: {
        sourceCategoriesData: '=',
        sourceData: '='
    },
    controller: ['$rootScope','$scope','$state', '$stateParams',function($rootScope, $scope, $state, $stateParams){
        $scope.sourceCategoriesData = this.sourceCategoriesData;

        $scope.activeSource = this.sourceData;

        $scope.categoryActive = false;
        $scope.activeCategory = {};

        /*
         * Initializer
         * */
        $scope.$watch('selectedIndex', function(current, old){
            if(current != old){
                $scope.activateCategory(current);
            }
        });

        $scope.activateCategory = function(index) {
            $scope.categoryActive = true;
            $scope.activeCategory = $scope.sourceCategoriesData[index];
            $state.go('app.sourcePosts.category', {
                sourceId: $stateParams.sourceId,
                categoryId: $scope.activeCategory.$id
            })
        };

        /*
         * Triggers Initializer
         * */
        $scope.activateCategory(0);


    }]
});



