/**
 * Created by Computadora on 31-Oct-16.
 */
app.directive('trendingHashtag', [function(){
    return {
        restrict: 'E',
        scope: {
            lastPost: '='
        },
        templateUrl: '/core/common/Hashtag/trendingHashtag.html',
        link: function(scope, element, attrs) {
            scope.$watch('lastPost', function(newValue, oldValue) {
                if(newValue != undefined){
                    var currentDate = new Date();
                    var lastPostDate = new Date(scope.lastPost);
                    var threeHours = 60 * 60 * 3000;
                    var eightHours = 60 * 60 * 8000;
                    var oneDay = 60 * 60 * 24000;

                    if((currentDate - lastPostDate) <= oneDay){
                        scope.hashtagDetails = {
                            icon: 'arrow_drop_up',
                            theme: 'color-green',
                            status: 'Trending'
                        }
                    }else{
                        scope.hashtagDetails = {
                            icon: 'arrow_drop_down',
                            theme: 'color-red',
                            status: 'Not Trending'
                        }
                    }
                }
            }, true);
        }
    }
}]);