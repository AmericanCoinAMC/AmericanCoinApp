/**
 * Created by Computadora on 23-Dec-16.
 */
/**
 * Created by Computadora on 23-Dec-16.
 */

app.directive('ignoreSwitch', [
    '$rootScope', 'IgnoredSourcesService', 'Message', 'IgnoredSources',
    function($rootScope, IgnoredSourcesService, Message, IgnoredSources){
    return {
        restrict: 'E',
        scope: {
            source: '='
        },
        templateUrl: '/core/common/Source/ignoreSwitch.html',
        link: function(scope, element, attrs) {
            scope.ignoredSources = IgnoredSources(rootRef.child('ignoredSources/' + $rootScope.userInfo.$id));

            scope.ignoredSources.$loaded().then(function(){
                scope.isIgnored = !scope.ignoredSources.isSourceIgnored(scope.source);
            });

            scope.$watch('isIgnored', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.isIgnored = newValue;
                }
            }, true);

            scope.toggleSource = function(source){
                if(scope.ignoredSources.isSourceIgnored(source)){
                    scope.unignoreSource(source);
                }else{
                    scope.ignoreSource(source);
                }
            };

            scope.ignoreSource = function (source) {
                IgnoredSourcesService.ignoreSource(source).then(function(){

                }).catch(function(err){
                    console.log(err);
                    Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                });
            };

            scope.unignoreSource = function (source) {
                IgnoredSourcesService.unignoreSource(source).then(function(){

                }).catch(function(err){
                    console.log(err);
                    Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                });
            };
        }
    }
}]);