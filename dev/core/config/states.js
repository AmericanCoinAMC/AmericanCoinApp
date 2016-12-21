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
            template: '<app></app>',
            resolve: {
                categoriesData: ['$firebaseArray', function($firebaseArray){
                    return $firebaseArray(rootRef.child('categories').orderByPriority()).$loaded();
                }],
                currentAuth: ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        .state('app.main', {
            url: '/main',
            template: '<main></main>',
            resolve: {

            }
        })

        .state('app.news', {
            url: '/news',
            template: '<news categories-data="$resolve.categoriesData"></news>',
            resolve: {

            }
        })

        .state('app.sourcePosts', {
            url: '/sourcePosts/:sourceId',
            template: '<source-posts source-data="$resolve.sourceData" source-categories-data="$resolve.sourceCategoriesData"></source-posts>',
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
                sourceCategoriesData: function($firebaseArray, $stateParams){
                    return $firebaseArray(rootRef.child('sourcesCategories/' + $stateParams.sourceId).orderByPriority()).$loaded();
                }
            }
        })
}]);