/**
 * Created by Computadora on 01-Nov-16.
 */
app.directive('hashtagCard', [
    '$rootScope', 'FeedService',
    function($rootScope, FeedService){
        return {
            restrict: 'E',
            scope: {
                hashtag: '='
            },
            templateUrl: '/core/common/Hashtag/hashtagCard.html',
            link: function(scope, element, attrs) {

                scope.$watch('hashtag', function(newValue, oldValue) {
                    if(newValue != undefined){
                        scope.hashtag = newValue;
                    }
                }, true);

                scope.displayHashtagFeed = function(event, hashtag){
                    FeedService.loadHashtagFeed(event, hashtag);
                };

            }
        }
    }]);