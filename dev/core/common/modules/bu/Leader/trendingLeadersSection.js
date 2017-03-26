/**
 * Created by Computadora on 28-Dec-16.
 */
app.directive('trendingLeadersSection', ['$firebaseArray', 'FeedService', function($firebaseArray, FeedService){
    return {
        restrict: 'E',
        scope: {
            height: '='
        },
        templateUrl: '/core/common/Leader/trendingLeadersSection.html',
        link: function(scope, element, attrs) {
            scope.loaded = false;
            $firebaseArray(rootRef.child('leaders').limitToFirst(10)).$loaded().then(function(trendingLeaders){
                scope.loaded = true;
                scope.trendingLeaders = trendingLeaders;
            });

            scope.loadFeed = function(ev, leader){
                FeedService.loadLeaderFeed(ev, leader);
            };

            scope.$watch('height', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.height = newValue;

                }
            }, true);
        }
    }
}]);