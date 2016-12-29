/**
 * Created by Jess on 28-Oct-16.
 */
app.directive('loader', [function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        templateUrl: '/core/common/Preloader/loader.html',
        link: function(scope, elem, attrs) {

            scope.$watch('show', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.show = newValue;
                }
            }, true);
        }
    };
}]);