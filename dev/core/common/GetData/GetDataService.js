/**
 * Created by Jess on 24-Aug-16.
 */

app.factory('GetDataService',
    ['$q', 'SourceObjectService',
    function($q, SourceObjectService){
    return{
        getSourceData: function(sourceId){
            var deferred = $q.defer();
            rootRef.child('sources/'+sourceId).once('value', function(snapshot) {
                deferred.resolve(SourceObjectService.buildFromSnapshot(snapshot));
            });
            return deferred.promise;
        },

        getApiKeys: function(){
            var deferred = $q.defer();
            rootRef.child('apiKeys/').once('value').then(function(snapshot){
                deferred.resolve(snapshot.val());
            }).catch(function(err){deferred.reject(err)});
            return deferred.promise;
        }

    }
}]);