/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('UserPosts', ['$firebaseArray', function($firebaseArray){
    var UserPosts = $firebaseArray.$extend({
        userHasPost: function(post){
            if(post){
                var found = false;
                angular.forEach(this.$list, function(rec){
                    if(post.$id == rec.$id){
                        found = true;
                    }
                });
                return found;
            }

        }
    });

    return function(ref){
        return new UserPosts(ref);
    }
}])
.factory('UserPostsService', ['$q', '$rootScope', 'PostObjectService', function($q, $rootScope, PostObjectService){
    return{
        addPost: function(post){
            var deferred = $q.defer();
            var ref = rootRef.child('userPosts/' + $rootScope.userInfo.$id + '/' + post.$id);
            ref.setWithPriority(this.buildPostObject(post), post.$priority).then(function(){
                deferred.resolve(true);
            }).catch(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },

        removePost: function(post){
            var deferred = $q.defer();
            var ref = rootRef.child('userPosts/' + $rootScope.userInfo.$id + '/' + post.$id);
            ref.remove().then(function(){
                deferred.resolve(true);
            }).catch(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },

        buildPostObject: function(post){
            return PostObjectService.buildMinified(post);
        }

    }
}])
.directive('userPostElement', [
        '$rootScope', 'UserPosts', 'UserPostsService',
        function($rootScope, UserPosts, UserPostsService){
    return {
        restrict: 'E',
        scope: {
            post: '='
        },
        templateUrl: '/core/common/User/userPosts.html',
        link: function(scope, element, attrs) {
            scope.userPosts = UserPosts(rootRef.child('userPosts/' + $rootScope.userInfo.$id));

            scope.$watch('userPosts.userHasPost(post)', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.hasPost = newValue;
                }
            }, true);

            scope.togglePost = function(post){
                if(scope.userPosts.userHasPost(post)){
                    scope.removePost(post);
                }else{
                    scope.addPost(post);
                }
            };

            scope.addPost = function (post) {
                UserPostsService.addPost(post).then(function(){
                }).catch(function(err){
                    console.log(err);
                    Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                });
            };

            scope.removePost = function (post) {
                UserPostsService.removePost(post).then(function(){
                }).catch(function(err){
                    console.log(err);
                    Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                });
            };
        }
    }
}]);