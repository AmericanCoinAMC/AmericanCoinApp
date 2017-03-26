/**
 * Created by Jess on 28-Oct-16.
 */
app.directive('loader', [function() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            top: '=',
            right: '=',
            left: '=',
            bottom: '='
        },
        templateUrl: '/core/common/helpers/Preloader/loader.html',
        link: function(scope, elem, attrs) {
            scope.top = scope.top || 15 + 'px';


            scope.$watch('show', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.show = newValue;
                }
            }, true);
        }
    };
}]);