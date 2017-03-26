/**
 * Created by cem on 24-Nov-16.
 */
app.directive('postCard',
    ['PostDialogService',
    function(PostDialogService){
    return {
        restrict: 'E',
        scope: {
            post: '='
        },
        templateUrl: '/core/common/Post/postCard.html',
        link: function(scope, element, attrs) {
            scope.displayPost = function(event){
                PostDialogService.displayPost(event, scope.post);
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