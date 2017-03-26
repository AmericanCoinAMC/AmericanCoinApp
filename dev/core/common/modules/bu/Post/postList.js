/**
 * Created by cem on 24-Nov-16.
 */
app.directive('postList',
    ['$sce',
    function($sce){
    return {
        restrict: 'E',
        scope: {
            post: '='
        },
        templateUrl: '/core/common/Post/postList.html',
        link: function(scope, element, attrs) {
            scope.contentDisplayed = false;

            scope.toggleContent = function(){
               if(scope.contentDisplayed){
                   scope.contentDisplayed = false;
               }else{
                   scope.displayContent();
               }
            };

            scope.displayContent = function(){
                scope.htmlContent = $sce.trustAsHtml(scope.post.content);
                twttr.ready(
                    function (twttr) {
                        twttr.widgets.load();
                    }
                );
                scope.contentDisplayed = true;
            };

            /*
             * Watchers
             * */

            scope.$watch('post', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.post = newValue;
                }
            }, true);

        }
    }
}]);