/**
 * Created by Jess on 24-Aug-16.
 */

app.factory('GetDataService',
    ['$q',
    function($q){
    return{
        getSourceData: function(sourceId){
            var deferred = $q.defer();
            rootRef.child('sources/'+sourceId).once('value', function(snapshot) {
                var sourceObject = {
                    $id: snapshot.key,
                    name: snapshot.val().name,
                    description: snapshot.val().description,
                    fileName:  snapshot.val().fileName,
                    fileUrl:  snapshot.val().fileUrl,
                    compatibility:  snapshot.val().compatibility,
                    ogConfig:  snapshot.val().ogConfig,
                    postConfig:  snapshot.val().postConfig,
                    profile:  snapshot.val().profile,
                    selector:  snapshot.val().selector,
                    status:  snapshot.val().status,
                    $priority: snapshot.getPriority()
                };
                deferred.resolve(sourceObject);
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