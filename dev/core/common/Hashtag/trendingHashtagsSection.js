/**
 * Created by Computadora on 28-Dec-16.
 */
app.directive('trendingHashtagsSection', ['$firebaseArray', 'FeedService', function($firebaseArray, FeedService){
    return {
        restrict: 'E',
        scope: {
            height: '='
        },
        templateUrl: '/core/common/Hashtag/trendingHashtagsSection.html',
        link: function(scope, element, attrs) {
            scope.loaded = false;
            $firebaseArray(rootRef.child('hashtags').limitToFirst(10)).$loaded().then(function(trendingHashtags){
                scope.loaded = true;
                scope.trendingHashtags = trendingHashtags;
            });

            scope.loadFeed = function(ev, hashtag){
                FeedService.loadHashtagFeed(ev, hashtag);
            };

            scope.$watch('height', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.height = newValue;

                }
            }, true);
        }
    }
}]);