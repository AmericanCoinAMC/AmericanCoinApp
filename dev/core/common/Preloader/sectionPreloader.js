/**
 * Created by Jess on 28-Oct-16.
 */
app.directive('sectionPreloader', [function() {
    return {
        restrict: 'E',
        scope: {
            status: '='
        },
        templateUrl: '/core/common/Preloader/sectionPreloader.html',
        link: function(scope, elem, attrs) {

            scope.$watch('status', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.status = newValue;
                }
            }, true);
        }
    };
}]);