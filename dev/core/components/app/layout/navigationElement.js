/**
 * Created by Jess on 28-Oct-16.
 */
app.directive('navigationElement', [
    '$rootScope', '$stateParams',
    function($rootScope, $stateParams) {
    return {
        restrict: 'A',
        scope: {
            views: '=',
            active: '=',
            customCondition: '='
        },
        link: function(scope, element, attrs) {
            scope.theme = 'teal';
            scope.stateParams = $stateParams;
            scope.currentState = $rootScope.currentState;

            scope.navItem = {};
            scope.valid = false;

            scope.handleViewsActive = function(){
                var viewsActive = false;
                for(var x = 0; x < scope.views.length; x++){
                    if($rootScope.toState.name == scope.views[x]){
                        viewsActive = true;
                    }
                }
                if(viewsActive){
                    element.addClass('color-' + scope.theme);
                    scope.valid = true;
                }else{
                    element.removeClass('color-' + scope.theme);
                    scope.valid = false;
                }
            };

            scope.handleCustomCondition = function(){
                if(scope.customCondition){
                    element.addClass('color-' + scope.theme);
                    scope.valid = true;
                }else{
                    element.removeClass('color-' + scope.theme);
                    scope.valid = false;
                }
            };

            scope.init = function(){
                for(var i = 0; i < scope.active.length; i++){
                    if('addClass' in scope.active[i]){
                        for(var z = 0; z < scope.active[i]['addClass'].length; z++){
                            if(scope.active[i]['addClass'][z] == 'views-active'){
                                scope.handleViewsActive();
                            }
                            if(scope.active[i]['addClass'][z] == 'custom-condition'){
                                scope.handleCustomCondition();
                            }

                        }
                    }
                }
            };

            scope.init();

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options) {
                    scope.init();
                });

            scope.$watch('customCondition', function(newVal, oldVal) {
                if(newVal != undefined){
                    scope.customCondition = newVal;
                    scope.valid = newVal;
                    if(newVal){
                        element.addClass('color-' + scope.theme);
                    }else{
                        element.removeClass('color-' + scope.theme);
                    }
                }
            }, true);
        }
    };
}]);