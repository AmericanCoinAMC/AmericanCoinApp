/**
 * Created by Computadora on 02-Dec-16.
 */

app.factory('SourceObjectService', function(){
    return{
        buildFromSnapshot: function(snapshot){
            return {
                $id: snapshot.key,
                name: snapshot.val().name,
                description: snapshot.val().description,
                fileUrl: snapshot.val().fileUrl,
                fileName: snapshot.val().fileName,
                compatibility: snapshot.val().compatibility,
                ogConfig: snapshot.val().ogConfig,
                postConfig: snapshot.val().postConfig,
                profile: snapshot.val().profile,
                selector: snapshot.val().selector,
                status: snapshot.val().status,
                timestamp:  firebase.database.ServerValue.TIMESTAMP,
                $priority: snapshot.getPriority()
            };
        },

        buildMinified: function(source){
            return {
                name: source.name,
                description: source.description,
                fileUrl: source.fileUrl,
                fileName: source.fileName,
                compatibility: source.compatibility,
                ogConfig: source.ogConfig,
                postConfig: source.postConfig,
                profile: source.profile,
                selector: source.selector,
                status: source.status,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                '.priority': source.$priority
            };
        },

        buildMinifiedAlt: function(source){
            return {
                id: source.$id,
                name: source.name,
                description: source.description,
                fileUrl: source.fileUrl,
                fileName: source.fileName,
                compatibility: source.compatibility,
                ogConfig: source.ogConfig,
                postConfig: source.postConfig,
                profile: source.profile,
                selector: source.selector,
                status: source.status,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                '.priority': source.$priority
            };
        }
    }
});
