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
                primaryHashtag: postSnapshot.val().primaryHashtag,
                secondaryHashtags: postSnapshot.val().secondaryHashtags,
                leaders: postSnapshot.val().leaders,
                timestamp: postSnapshot.val().timestamp,
                views: postSnapshot.val().views,
                subscriptions: postSnapshot.val().subscriptions,
                $priority: postSnapshot.getPriority()
            };
        },

        buildMinified: function(post){
            if(post.primaryHashtag == undefined){
                post.primaryHashtag = null;
            }
            if(post.secondaryHashtags == undefined){
                post.secondaryHashtags = null;
            }
            if(post.leaders == undefined){
                post.leaders = null;
            }
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
                primaryHashtag: post.primaryHashtag,
                secondaryHashtags: post.secondaryHashtags,
                leaders: post.leaders,
                timestamp: post.timestamp,
                views: post.views,
                subscriptions: post.subscriptions,
                '.priority': post.$priority
            };
        },

        buildMinifiedAlt: function(post){
            if(post.primaryHashtag == undefined){
                post.primaryHashtag = null;
            }
            if(post.secondaryHashtags == undefined){
                post.secondaryHashtags = null;
            }
            if(post.leaders == undefined){
                post.leaders = null;
            }
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
                primaryHashtag: post.primaryHashtag,
                secondaryHashtags: post.secondaryHashtags,
                leaders: post.leaders,
                timestamp: post.timestamp,
                views: post.views,
                subscriptions: post.subscriptions,
                '.priority': post.$priority
            };
        }

    }
});
