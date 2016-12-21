/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('IgnoredSources',['$firebaseArray', function($firebaseArray){
    var IgnoredSources = $firebaseArray.$extend({
        isSourceIgnored: function(source){
            if(source){
                var sourceId;
                if(source.$id == undefined){
                    sourceId = source.id;
                }else{
                    sourceId = source.$id;
                }
                var found = false;
                angular.forEach(this.$list, function(rec){
                    if(sourceId == rec.$id){
                        found = true;
                    }
                });
                return found;
            }

        }
    });

    return function(ref){
        return new IgnoredSources(ref);
    }
}])
    .factory('IgnoredSourcesService',['$q', '$rootScope', function($q, $rootScope){
        return{
            ignoreSource: function(source){
                var deferred = $q.defer();
                var ref = rootRef.child('ignoredSources/' + $rootScope.userInfo.$id + '/' + source.$id);
                ref.set({
                    eventDate: new Date().getTime()
                }).then(function(){
                    deferred.resolve(true);
                }).catch(function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            unignoreSource: function(source){
                var deferred = $q.defer();
                var ref = rootRef.child('ignoredSources/' + $rootScope.userInfo.$id + '/' + source.$id);
                ref.remove().then(function(){
                    deferred.resolve(true);
                }).catch(function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

        }
    }])
    .directive('isIgnored', [
        '$rootScope', 'IgnoredSourcesService', 'Message', 'IgnoredSources', '$timeout',
        function($rootScope, IgnoredSourcesService, Message, IgnoredSources, $timeout){
        return {
            restrict: 'A',
            scope: {
                source: '='
            },
            link: function(scope, element, attrs) {
                scope.ignoredSources = IgnoredSources(rootRef.child('ignoredSources/' + $rootScope.userInfo.$id));

                scope.ignoredSources.$loaded().then(function(){
                    scope.isIgnored = !scope.ignoredSources.isSourceIgnored(scope.source);
                });

                scope.$watch('ignoredSources', function(newValue, oldValue) {
                    if(newValue != undefined){
                        scope.isIgnored = !scope.ignoredSources.isSourceIgnored(scope.source);
                        if(scope.isIgnored){
                            element.show()
                        }else{
                            element.hide()
                        }
                    }
                }, true);

            }
        }
    }]);