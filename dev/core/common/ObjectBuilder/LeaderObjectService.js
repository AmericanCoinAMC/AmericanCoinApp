/**
 * Created by Computadora on 03-Dec-16.
 */
app.factory('LeaderObjectService', function(){

    return{
        buildFromSnapshot: function(snapshot){
            return {
                $id: snapshot.key,
                name: snapshot.val().name,
                roleName: snapshot.val().roleName,
                avatar: snapshot.val().avatar,
                fileName: snapshot.val().fileName,
                twitterName: snapshot.val().twitterName,
                wikiUrl: snapshot.val().wikiUrl,
                lastPost: snapshot.val().lastPost,
                views: snapshot.val().views || 0,
                subscriptions: snapshot.val().subscriptions || 0,
                timestamp:  firebase.database.ServerValue.TIMESTAMP,
                $priority: snapshot.getPriority() || -(snapshot.val().lastPost)
            };
        },

        buildMinified: function(leader){
            return {
                name: leader.name,
                roleName: leader.roleName,
                avatar: leader.avatar,
                fileName: leader.fileName,
                twitterName: leader.twitterName,
                wikiUrl: leader.wikiUrl,
                lastPost: leader.lastPost,
                views: leader.views || 0,
                subscriptions: leader.subscriptions || 0,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                '.priority': leader.$priority || -(leader.lastPost)
            };
        },

        buildMinifiedAlt: function(leader){
            return {
                id: leader.$id,
                name: leader.name,
                roleName: leader.roleName,
                avatar: leader.avatar,
                fileName: leader.fileName,
                twitterName: leader.twitterName,
                wikiUrl: leader.wikiUrl,
                lastPost: leader.lastPost,
                views: leader.views || 0,
                subscriptions: leader.subscriptions || 0,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                '.priority': leader.$priority || -(leader.lastPost)
            };
        },

        buildWithPriority: function(leader){
            var currentDate = new Date().getTime();
            return {
                $id: leader.id,
                name: leader.name,
                roleName: leader.roleName,
                twitterName: leader.twitterName,
                wikiUrl: leader.wikiUrl,
                avatar: leader.avatar,
                fileName: leader.fileName,
                lastPost: currentDate,
                views: leader.views || 0,
                subscriptions: leader.subscriptions || 0,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                $priority: -(currentDate)
            };
        }
    }
});
