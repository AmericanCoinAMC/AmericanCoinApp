app.factory('FeedService',
    ['HashtagPostsFeed', 'LeaderFeed',
    function(HashtagPostsFeed, LeaderFeed){

    return{

        loadHashtagFeed: function(ev, hashtag){
            HashtagPostsFeed.loadFeed(ev, hashtag);
        },

        loadLeaderFeed: function(ev, leader){
            LeaderFeed.loadFeed(ev, leader);
        }
    }
}]);

