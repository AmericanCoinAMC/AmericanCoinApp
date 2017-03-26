/**
 * Created by Jess on 14-Oct-16.
 */
app.component('news', {
    templateUrl: '/core/components/app/news/news.html',
    bindings: {
        categoriesData: '='
    },
    controller: [
        '$rootScope','$scope', 'PostObjectService', '$state',
        function($rootScope, $scope, PostObjectService, $state){
        $scope.categoriesData = this.categoriesData;
        $scope.categoryActive = false;
        $scope.activeCategory = {};
        $scope.selectedIndex = 0;



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
            $scope.activeCategory = $scope.categoriesData[index];
            $state.go('app.news.category', {categoryId: $scope.activeCategory.$id});
        };

        /*
         * Triggers Initializer
         * */
        $scope.activateCategory(0);

    }]
});


