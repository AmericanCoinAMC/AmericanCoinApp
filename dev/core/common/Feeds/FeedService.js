app.factory('FeedService',
    ['OutstandingPostsFeed', 'HashtagPostsFeed', 'TwitterProfileFeed',
    function(OutstandingPostsFeed, HashtagPostsFeed, TwitterProfileFeed){

    return{
        loadOutstandingFeed: function(ev){
            OutstandingPostsFeed.loadFeed(ev);
        },

        loadHashtagFeed: function(ev, hashtag){
            HashtagPostsFeed.loadFeed(ev, hashtag);
        },

        loadTwitterProfileFeed: function(ev, twitterObject){
            TwitterProfileFeed.loadFeed(ev, twitterObject);
        }
    }
}]);

