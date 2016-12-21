/**
 * Created by Computadora on 03-Dec-16.
 */

app.directive('postLeaders',
    ['FeedService',
    function(FeedService){
    return {
        restrict: 'E',
        scope: {
            post: '='
        },
        templateUrl: '/core/common/Post/postLeaders.html',
        link: function(scope, element, attrs) {


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