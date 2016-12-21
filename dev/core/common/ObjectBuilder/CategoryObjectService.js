/**
 * Created by Computadora on 02-Dec-16.
 */

app.factory('CategoryObjectService', function(){
    return{
        buildFromSnapshot: function(snapshot){
            return {
                $id: snapshot.key,
                name: snapshot.val().name,
                description: snapshot.val().description,
                fileUrl: snapshot.val().fileUrl,
                fileName: snapshot.val().fileName,
                autoSave: snapshot.val().autoSave,
                $priority: snapshot.getPriority()
            };
        },

        buildMinified: function(category){
            return {
                name: category.name,
                description: category.description,
                fileUrl: category.fileUrl,
                fileName: category.fileName,
                autoSave: category.autoSave,
                '.priority': category.$priority
            };
        },

        buildMinifiedAlt: function(category){
            return {
                id: category.$id,
                name: category.name,
                description: category.description,
                fileUrl: category.fileUrl,
                fileName: category.fileName,
                autoSave: category.autoSave,
                '.priority': category.$priority
            };
        }
    }
});
