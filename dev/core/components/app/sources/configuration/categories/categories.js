/**
 * Created by Computadora on 17-Jan-17.
 */

app.directive('sourceCategoriesConfig',
    ['$timeout', 'Message', function($timeout, Message){
        return {
            restrict: 'E',
            scope: {
                source: '='
            },
            templateUrl: '/core/components/app/sources/configuration/categories/categories.html',
            link: function(scope, element, attrs) {
                var categoryClass = new Category();

                scope.atomicArray = categoryClass.db.atomicArray;

                scope.atomicArray
                    .$on({
                        initialLotSize: 1000
                    })
                    .then(function(instanceID){
                        document.addEventListener(instanceID + '_apply_filters', function () {
                            $timeout(function(){});
                        }, false);
                    });



                /*
                 * Watchers
                 * */

                scope.$watch('source', function(newValue, oldValue) {
                    if(newValue != undefined){
                        scope.source = newValue;
                    }
                }, true);

            }
        }
    }]);