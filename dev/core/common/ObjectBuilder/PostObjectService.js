/**
 * Created by Computadora on 02-Dec-16.
 */

app.factory('PostObjectService', function(){
    return{
        buildFromSnapshot: function(postSnapshot){
            if(postSnapshot.val().primaryHashtag == undefined){
                postSnapshot.val().primaryHashtag = null;
            }
            if(postSnapshot.val().secondaryHashtags == undefined){
                postSnapshot.val().secondaryHashtags = null;
            }
            if(postSnapshot.val().leaders == undefined){
                postSnapshot.val().leaders = null;
            }
            return {
                $id: postSnapshot.key,
                url: postSnapshot.val().url,
                title: postSnapshot.val().title,
                description: postSnapshot.val().description,
                image: postSnapshot.val().image,
                content: postSnapshot.val().content,
                outstanding: postSnapshot.val().outstanding,
                notificationPushed: postSnapshot.val().notificationPushed,
                eventDate: postSnapshot.val().eventDate,
                category: postSnapshot.val().category,
                source: postSnapshot.val().source,
                primaryHashtag: postSnapshot.val().primaryHashtag || null,
                secondaryHashtags: postSnapshot.val().secondaryHashtags || null,
                leaders: postSnapshot.val().leaders || null,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                views: postSnapshot.val().views || 0,
                subscriptions: postSnapshot.val().subscriptions || 0,
                $priority: postSnapshot.getPriority()
            };
        },

        buildMinified: function(post){
            return {
                url: post.url,
                title: post.title,
                description: post.description,
                image: post.image,
                content: post.content,
                outstanding: post.outstanding,
                notificationPushed: post.notificationPushed,
                eventDate: post.eventDate,
                category: post.category,
                source: post.source,
                primaryHashtag: post.primaryHashtag || null,
                secondaryHashtags: post.secondaryHashtags || null,
                leaders: post.leaders || null,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                views: post.views || 0,
                subscriptions: post.subscriptions || 0,
                '.priority': post.$priority
            };
        },

        buildMinifiedAlt: function(post){
            return {
                url: post.url,
                title: post.title,
                description: post.description,
                image: post.image,
                content: post.content,
                outstanding: post.outstanding,
                notificationPushed: post.notificationPushed,
                eventDate: post.eventDate,
                category: post.category,
                source: post.source,
                primaryHashtag: post.primaryHashtag || null,
                secondaryHashtags: post.secondaryHashtags || null,
                leaders: post.leaders || null,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                views: post.views || 0,
                subscriptions: post.subscriptions || 0,
                '.priority': post.$priority
            };
        }

    }
});
