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

                    if((currentDate - lastPostDate) <= threeHours){
                        scope.hashtagDetails = {
                            icon: 'arrow_drop_up',
                            theme: 'color-green',
                            status: 'Trending'
                        }
                    }else if(currentDate - lastPostDate < eightHours && currentDate - lastPostDate >= threeHours){
                        scope.hashtagDetails = {
                            icon: 'remove',
                            theme: ' ',
                            status: 'Perdiendo relevancia en la actualidad.'
                        }
                    }else{
                        scope.hashtagDetails = {
                            icon: 'arrow_drop_down',
                            theme: 'color-red',
                            status: 'Irrelevante en la actualidad.'
                        }
                    }
                }
            }, true);
        }
    }
}]);