/**
 * Created by Computadora on 23-Dec-16.
 */
/**
 * Created by Computadora on 23-Dec-16.
 */

app.directive('ignoreSwitch', ['$rootScope', function($rootScope){
    return {
        restrict: 'E',
        scope: {
            source: '='
        },
        templateUrl: '/core/common/Source/ignoreSwitch.html',
        link: function(scope, element, attrs) {
            scope.userIgnoredSources = $rootScope.userIgnoredSources;

            scope.$watch('userIgnoredSources.isIgnored(source)', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.isIgnored = !newValue;
                }
            }, true);

            scope.toggleSource = function(){
                if(scope.userIgnoredSources.isIgnored(scope.source)){
                    scope.userIgnoredSources.unignoreSource(scope.source);
                }else{
                    scope.userIgnoredSources.ignoreSource(scope.source);
                }
            };
        }
    }
}]);