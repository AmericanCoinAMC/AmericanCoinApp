/**
 * Created by Computadora on 20-Dec-16.
 */
app.directive('isPreloader', [function() {
    return {
        restrict: 'E',
        scope: {
            fetching: '='
        },
        templateUrl: '/core/common/Preloader/infiniteScrollPreloader.html',
        link: function(scope, elem, attrs) {
            scope.$watch('fetching', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.fetching = newValue;
                }
            }, true);
        }
    };
}]);