/**
 * Created by Computadora on 08-Feb-17.
 */
app.component('allArticles', {
    templateUrl: '/core/components/app/articles/allArticles.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope', '$state', '$timeout',
        function($rootScope, $scope, $state, $timeout){
            $scope.categoryActive = false;
            $scope.activeCategory = {};
            $scope.selectedIndex = 0;

            $scope.loaded = false;

            var categoryClass = new Category();


            $scope.categoryArray = categoryClass.db.atomicArray;

            $scope.categoryArray
                .$on({
                    initialLotSize: 1000
                })
                .then(function(instanceID){
                    $scope.activateCategory(0);
                    $scope.loaded = true;

                    document.addEventListener($scope.categoryArray.id + '_apply_filters', function () {
                        $timeout(function(){});
                    }, false);
                });




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
                $scope.activeCategory = $scope.categoryArray.items[index];
                $state.go('app.articles.all.category', {categoryId: $scope.activeCategory.$key});
            };


        }]
});

