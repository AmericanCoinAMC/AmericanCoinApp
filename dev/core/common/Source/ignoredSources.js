/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('IgnoredSources',[
    '$rootScope', '$firebaseObject', '$q',
    function($rootScope, $firebaseObject, $q){
    var IgnoredSources = $firebaseObject.$extend({


        isIgnored: function(source){
            if(source){
                var sourceId = this.getSourceId(source);
                return sourceId in this;
            }
        },

        ignoreSource: function(source){
            var deferred = $q.defer();
            var ref = rootRef.child('ignoredSources/' + $rootScope.userInfo.$id + '/' + this.getSourceId(source));
            ref.set(true).then(function(){
                deferred.resolve(true);
            }).catch(function(err){
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        unignoreSource: function(source){
            var deferred = $q.defer();
            var ref = rootRef.child('ignoredSources/' + $rootScope.userInfo.$id + '/' + this.getSourceId(source));
            ref.remove().then(function(){
                deferred.resolve(true);
            }).catch(function(err){
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        getSourceId: function(source){
            var sourceId;
            if(source.$id == undefined){
                sourceId = source.id;
            }else{
                sourceId = source.$id;
            }
            return sourceId;
        }



    });

    return function(ref){
        return new IgnoredSources(ref);
    }
}]);