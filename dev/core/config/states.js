app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/intro");

    $stateProvider

        .state('intro', {
            url: '/intro',
            template: '<intro></intro>',
            resolve: {

            }
        })

        .state('app', {
            url: '/app',
            abstract: true,
            template: '<app categories-data="$resolve.categoriesData"></app>',
            resolve: {
                categoriesData: ['$firebaseArray', function($firebaseArray){
                    return $firebaseArray(rootRef.child('categories').orderByPriority()).$loaded();
                }],
                activeSources: ['ActiveSources', '$rootScope', '$q', function(ActiveSources, $rootScope, $q){
                    var defer = $q.defer();
                    ActiveSources(rootRef.child('sources').orderByChild('status/active').equalTo(true)).$loaded()
                        .then(function(activeSources){
                            $rootScope.activeSources = activeSources;
                            defer.resolve(activeSources);
                        });
                    return defer.promise;
                }],
                userIgnoredSources: [
                    '$q', 'IgnoredSources', 'Auth', '$rootScope',
                    function($q, IgnoredSources, Auth, $rootScope){
                    var defer = $q.defer();
                    Auth.$requireSignIn().then(function(){
                        var userInfo = Auth.$getAuth();
                        IgnoredSources(rootRef.child('ignoredSources/' + userInfo.uid))
                            .$loaded().then(function(userIgnoredSources){
                                $rootScope.userIgnoredSources = userIgnoredSources;
                                defer.resolve(userIgnoredSources);
                            }).catch(function(err){
                                console.log(err);
                                defer.reject(err);
                            });
                    }).catch(function(err){
                        console.log(err);
                        defer.reject(err);
                    });
                    return defer.promise;
                }],
                bookmarkPosts: [
                    '$q', 'BookmarkPosts', 'Auth', '$rootScope',
                    function($q, BookmarkPosts, Auth, $rootScope){
                        var defer = $q.defer();
                        Auth.$requireSignIn().then(function(){
                            var userInfo = Auth.$getAuth();
                            BookmarkPosts(rootRef.child('bookmarkedPosts/' + userInfo.uid))
                                .$loaded().then(function(bookmarkPosts){
                                    $rootScope.bookmarkPosts = bookmarkPosts;
                                    defer.resolve(bookmarkPosts);
                                }).catch(function(err){
                                    console.log(err);
                                    defer.reject(err);
                                });
                        }).catch(function(err){
                            console.log(err);
                            defer.reject(err);
                        });
                        return defer.promise;
                    }],
                bookmarkHashtags: [
                    '$q', 'BookmarkHashtags', 'Auth', '$rootScope',
                    function($q, BookmarkHashtags, Auth, $rootScope){
                        var defer = $q.defer();
                        Auth.$requireSignIn().then(function(){
                            var userInfo = Auth.$getAuth();
                            BookmarkHashtags(rootRef.child('bookmarkedHashtags/' + userInfo.uid))
                                .$loaded().then(function(bookmarkHashtags){
                                    $rootScope.bookmarkHashtags = bookmarkHashtags;
                                    defer.resolve(bookmarkHashtags);
                                }).catch(function(err){
                                    console.log(err);
                                    defer.reject(err);
                                });
                        }).catch(function(err){
                            console.log(err);
                            defer.reject(err);
                        });
                        return defer.promise;
                    }],
                bookmarkLeaders: [
                    '$q', 'BookmarkLeaders', 'Auth', '$rootScope',
                    function($q, BookmarkLeaders, Auth, $rootScope){
                        var defer = $q.defer();
                        Auth.$requireSignIn().then(function(){
                            var userInfo = Auth.$getAuth();
                            BookmarkLeaders(rootRef.child('bookmarkedLeaders/' + userInfo.uid))
                                .$loaded().then(function(bookmarkLeaders){
                                    $rootScope.bookmarkLeaders = bookmarkLeaders;
                                    defer.resolve(bookmarkLeaders);
                                }).catch(function(err){
                                    console.log(err);
                                    defer.reject(err);
                                });
                        }).catch(function(err){
                            console.log(err);
                            defer.reject(err);
                        });
                        return defer.promise;
                    }]
            }
        })

        .state('app.minoticiero', {
            url: '/minoticiero',
            template: '<minoticiero></minoticiero>',
            resolve: {

            }
        })

        .state('app.news', {
            url: '/news',
            template: '<news categories-data="$resolve.categoriesData"></news>',
            resolve: {

            }
        })

        .state('app.news.category', {
            url: '/:categoryId',
            template: '<news-category></news-category>',
            resolve: {

            }
        })

        .state('app.sourcePosts', {
            url: '/sourcePosts',
            template: '<source-posts source-data="$resolve.sourceData" source-categories-data="$resolve.sourceCategoriesData"></source-posts>',
            params: {
                sourceId: null
            },
            resolve: {
                sourceData: [
                    '$rootScope', 'GetDataService', '$stateParams', '$q',
                    function($rootScope, GetDataService, $stateParams, $q) {
                    var defer = $q.defer();
                    GetDataService.getSourceData($stateParams.sourceId).then(function (sourceObject) {
                        if (sourceObject) {
                            defer.resolve(sourceObject);
                        } else {
                            defer.reject('SOURCE_DATA_NOT_FOUND');
                        }
                    }).catch(function (err) {
                        console.log(err);
                        defer.reject('SOURCE_DATA_NOT_FOUND');
                    });
                    return defer.promise;
                }],
                sourceCategoriesData: ['$firebaseArray', '$stateParams',function($firebaseArray, $stateParams){
                    return $firebaseArray(rootRef.child('sourcesCategories/' + $stateParams.sourceId).orderByPriority()).$loaded();
                }]
            }
        })

        .state('app.sourcePosts.category', {
            url: '/category',
            template: '<source-posts-category></source-posts-category>',
            params: {
                sourceId: null,
                categoryId: null
            },
            resolve: {

            }
        })

        .state('app.hashtags', {
            url: '/hashtags',
            template: '<hashtags></hashtags>',
            resolve: {

            }
        })

        .state('app.leaders', {
            url: '/leaders',
            template: '<leaders></leaders>',
            resolve: {

            }
        })
}]);