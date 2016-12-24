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
                timestamp: snapshot.val().timestamp,
                views: snapshot.val().views,
                subscriptions: snapshot.val().subscriptions,
                $priority: snapshot.getPriority()
            };
        },

        buildMinified: function(hashtag){
            return {
                name: hashtag.name,
                description: hashtag.description,
                fileUrl: hashtag.fileUrl,
                fileName: hashtag.fileName,
                lastPost: hashtag.lastPost,
                timestamp: hashtag.timestamp,
                views: hashtag.views,
                subscriptions: hashtag.subscriptions,
                '.priority': hashtag.$priority
            };
        },

        buildMinifiedWithPriority: function(hashtag){
            return {
                name: hashtag.name,
                description: hashtag.description,
                fileUrl: hashtag.fileUrl,
                fileName: hashtag.fileName,
                lastPost: hashtag.lastPost,
                timestamp: hashtag.timestamp,
                views: hashtag.views,
                subscriptions: hashtag.subscriptions,
                '.priority': -(hashtag.lastPost)
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
                timestamp: hashtag.timestamp,
                views: hashtag.views,
                subscriptions: hashtag.subscriptions,
                '.priority': hashtag.$priority
            };
        },

        buildInverse: function(hashtag){
            var currentDate = new Date().getTime();
            var negativeStamp = -(currentDate);
            return {
                $id: hashtag.id,
                name: hashtag.name,
                description: hashtag.description,
                fileUrl: hashtag.fileUrl,
                fileName: hashtag.fileName,
                lastPost: currentDate,
                timestamp: hashtag.timestamp,
                views: hashtag.views,
                subscriptions: hashtag.subscriptions,
                $priority: negativeStamp
            };
        }
    }
});
