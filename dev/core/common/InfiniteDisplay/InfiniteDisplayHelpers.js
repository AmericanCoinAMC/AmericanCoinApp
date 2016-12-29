/**
 * Created by Computadora on 12-Dec-16.
 */

app.factory('InfiniteDisplayFilters',
    ['$rootScope',
        function($rootScope){
            return {
                activeSources: function(post){
                    return post.source.status.active;
                },

                userIgnoredSources: function(post){
                    var isIgnored = $rootScope.userIgnoredSources.isIgnored(post.source);
                    return !isIgnored;
                }
            }
        }])
    .factory('InfiniteDisplaySort', [function(){
        return {
            desc: function(a, b){
                return parseFloat(a.$priority) - parseFloat(b.$priority);
            }
        }
    }]);