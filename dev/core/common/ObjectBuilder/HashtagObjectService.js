/**
 * Created by Computadora on 02-Dec-16.
 */

app.factory('HashtagObjectService', function(){
    return{
        buildFromSnapshot: function(snapshot){
            return {
                $id: snapshot.key,
                name: snapshot.val().name,
                description: snapshot.val().description,
                fileUrl: snapshot.val().fileUrl,
                fileName: snapshot.val().fileName,
                lastPost: snapshot.val().lastPost,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                views: snapshot.val().views || 0,
                subscriptions: snapshot.val().subscriptions || 0,
                $priority: snapshot.getPriority() || -(snapshot.val().lastPost)
            };
        },

        buildMinified: function(hashtag){
            return {
                name: hashtag.name,
                description: hashtag.description,
                fileUrl: hashtag.fileUrl,
                fileName: hashtag.fileName,
                lastPost: hashtag.lastPost,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                views: hashtag.views || 0,
                subscriptions: hashtag.subscriptions || 0,
                '.priority': hashtag.$priority || -(hashtag.lastPost)
            };
        },

        buildMinifiedAlt: function(hashtag){
            return {
                id: hashtag.$id,
                name: hashtag.name,
                description: hashtag.description,
                fileUrl: hashtag.fileUrl,
                fileName: hashtag.fileName,
                lastPost: hashtag.lastPost,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                views: hashtag.views || 0,
                subscriptions: hashtag.subscriptions || 0,
                '.priority': hashtag.$priority
            };
        },

        buildWithPriority: function(hashtag){
            var currentDate = new Date().getTime();
            return {
                $id: hashtag.id,
                name: hashtag.name,
                description: hashtag.description,
                fileUrl: hashtag.fileUrl,
                fileName: hashtag.fileName,
                lastPost: currentDate,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                views: hashtag.views || 0,
                subscriptions: hashtag.subscriptions || 0,
                $priority: -(currentDate)
            };
        }
    }
});
