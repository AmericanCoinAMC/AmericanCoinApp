/**
 * Created by Jess on 28-Oct-16.
 */
app.directive('toolbarSearch', ['$timeout', '$rootScope', function($timeout, $rootScope) {
    return {
        restrict: 'E',
        scope: {

        },
        templateUrl: '/core/common/helpers/Search/toolbarSearch.html',
        link: function(scope, elem, attrs) {

            scope.startSearch = function(){
                scope.searching = true;
                var inputElement = document.getElementById('queryInput');
                $timeout(function () {
                    if(inputElement) inputElement.focus();
                });

            };

            scope.clearSearch = function(){
                scope.query = '';
                scope.searching = false;
            };

            scope.$watch('query', function(newValue, oldValue) {
                if(newValue != undefined){
                    $rootScope.$broadcast('queryUpdate', newValue);
                }
            }, true);
        }
    };
}]);