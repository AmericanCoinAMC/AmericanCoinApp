/**
 * Created by Jess on 15-Oct-16.
 */

app.directive('preloader', [function() {
    return {
        restrict: 'E',
        scope: {
            status: '='
        },
        templateUrl: '/core/common/helpers/Preloader/preloader.html',
        link: function(scope, elem, attrs) {

            scope.$watch('status', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.status = newValue;
                }
            }, true);
        }
    };
}]);