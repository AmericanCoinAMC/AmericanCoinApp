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
                $priority: snapshot.getPriority()
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
                '.priority': leader.$priority
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
                '.priority': leader.$priority
            };
        },

        buildInverse: function(leader){
            var negativeStamp = -(new Date().getTime());
            return {
                $id: leader.id,
                name: leader.name,
                roleName: leader.roleName,
                twitterName: leader.twitterName,
                wikiUrl: leader.wikiUrl,
                avatar: leader.avatar,
                fileName: leader.fileName,
                lastPost: new Date().getTime(),
                $priority: negativeStamp
            };
        }
    }
});
