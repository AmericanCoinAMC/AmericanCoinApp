/**
 * Created by Computadora on 01-Nov-16.
 */
app.directive('leaderCard', [
    '$rootScope', 'FeedService',
    function($rootScope, FeedService){
        return {
            restrict: 'E',
            scope: {
                leader: '='
            },
            templateUrl: '/core/common/Leader/leaderCard.html',
            link: function(scope, element, attrs) {
                scope.displayLeaderFeed = function(event, leader){
                    FeedService.loadLeaderFeed(event, leader);
                };

                scope.$watch('leader', function(newValue, oldValue) {
                    if(newValue != undefined){
                        scope.leader = newValue;
                    }
                }, true);
            }
        }
    }]);