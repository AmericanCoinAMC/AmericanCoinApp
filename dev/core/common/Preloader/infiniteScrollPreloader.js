/**
 * Created by Computadora on 20-Dec-16.
 */
app.directive('infiniteScrollPreloader', function() {
    return {
        restrict: 'E',
        scope: {
            paginating: '=',
            itemsRemaining: '='
        },
        templateUrl: '/core/common/InfiniteScroll/preloader.html',
        link: function(scope, elem, attrs) {

            scope.$watch('paginating', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.paginating = newValue;
                }
            }, true);

            scope.$watch('itemsRemaining', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.itemsRemaining = newValue;
                }
            }, true);
        }
    };
});