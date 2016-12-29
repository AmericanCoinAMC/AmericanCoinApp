/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('BookmarkLeaders', ['$firebaseArray', function($firebaseArray){
    var BookmarkLeaders = $firebaseArray.$extend({

        isBookmarked: function(leader){
            if(leader){
                var leaderId = leader.$id || leader.id;
                var found = false;
                angular.forEach(this.$list, function(rec){
                    if(leaderId == rec.$id){
                        found = true;
                    }
                });
                return found;
            }
        },
        getTotal: function(){
            var items = 0;
            angular.forEach(this.$list, function(rec){
                items += 1;
            });
            return items;
        }
    });

    return function(ref){
        return new BookmarkLeaders(ref);
    }
}])
    .factory('BookmarkLeadersService', [
        '$q', '$rootScope', 'LeaderObjectService',
        function($q, $rootScope, LeaderObjectService){
            return{
                addLeader: function(leader){
                    var deferred = $q.defer();
                    var ref = rootRef.child('bookmarkedLeaders/' + $rootScope.userInfo.$id + '/' + this.getElementId(leader));
                    ref.set(LeaderObjectService.buildMinified(leader)).then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                removeLeader: function(leader){
                    var deferred = $q.defer();
                    var ref = rootRef.child('bookmarkedLeaders/' + $rootScope.userInfo.$id + '/' + this.getElementId(leader));
                    ref.remove().then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                getElementId: function(leader){
                    return leader.$id || leader.id;
                }

            }
        }])
    .directive('bookmarkLeaderElement', [
        '$rootScope', 'BookmarkLeadersService',
        function($rootScope, BookmarkLeadersService){
            return {
                restrict: 'E',
                scope: {
                    leader: '='
                },
                templateUrl: '/core/common/Bookmark/bookmark.html',
                link: function(scope, element, attrs) {
                    scope.isBookmarked = false;
                    scope.bookmarkLeaders = $rootScope.bookmarkLeaders;

                    scope.$watch('bookmarkLeaders.isBookmarked(leader)', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.isBookmarked = newValue;
                        }
                    }, true);

                    scope.$watch('leader', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.leader = newValue;
                        }
                    }, true);

                    scope.toggle = function(){
                        if(scope.isBookmarked){
                            BookmarkLeadersService.removeLeader(scope.leader);
                        }else{
                            BookmarkLeadersService.addLeader(scope.leader);
                        }
                    };
                }
            }
        }]);