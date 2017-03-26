app.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        var sectionClass = new Section();

        $urlRouterProvider.otherwise("/intro");

        $stateProvider

        /*
         * Intro View
         * */
            .state('intro', {
                url: '/intro',
                template: '<intro></intro>',
                resolve: {

                }
            })


            /*
             * App View
             * */

            .state('app', {
                url: '/app',
                abstract: true,
                template: '<app></app>'
            })

            /*
             * Dashboard Related States
             * */
            .state('app.dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>',
                resolve: {
                    authorized: [
                        '$q', '$rootScope',
                        function($q, $rootScope){
                            var defer = $q.defer();
                            sectionClass.isAuthorized($rootScope.userInfo, 'dashboard')
                                .then(function(isAuthorized){
                                    defer.resolve(isAuthorized);
                                })
                                .catch(function(err){defer.reject(err);});
                            return defer.promise;
                        }]
                }
            })

            /*
             * Article Related States
             * */

            .state('app.articles', {
                url: '/articles',
                abstract: true,
                template: '<ui-view></ui-view>',
                resolve: {
                    authorized: [
                        '$q', '$rootScope',
                        function($q, $rootScope){
                            var defer = $q.defer();
                            sectionClass.isAuthorized($rootScope.userInfo, 'articles')
                                .then(function(isAuthorized){
                                    defer.resolve(isAuthorized);
                                })
                                .catch(function(err){defer.reject(err);});
                            return defer.promise;
                        }]
                }
            })

            .state('app.articles.all', {
                url: '/all',
                template: '<all-articles></all-articles>',
                resolve: {

                }
            })

            .state('app.articles.all.category', {
                url: '/category/:categoryId',
                template: '<all-articles-category></all-articles-category>',
                params: {
                    categoryId: null
                },
                resolve: {

                }
            })

            /*
            .state('app.posts.sourcePosts', {
                url: '/posts/configuration',
                template: '<configuration-posts configuration-data="$resolve.sourceData" configuration-categories-data="$resolve.sourceCategoriesData"></configuration-posts>',
                params: {
                    sourceId: null
                },
                resolve: {
                    sourceData: [
                        '$rootScope', 'GetDataService', '$stateParams', '$q',
                        function($rootScope, GetDataService, $stateParams, $q) {
                            var defer = $q.defer();
                            GetDataService.getSourceData($stateParams.sourceId).then(function (sourceObject) {
                                defer.resolve(sourceObject);
                            }).catch(function (err) {
                                console.log(err);
                                defer.reject('SOURCE_DATA_NOT_FOUND');
                            });
                            return defer.promise;
                        }],
                    sourceCategoriesData: ['$firebaseArray', '$stateParams',function($firebaseArray, $stateParams){
                        return $firebaseArray(rootRef.child('sourcesCategories/' + $stateParams.sourceId)).$loaded();
                    }]
                }
            })

            .state('app.posts.sourcePosts.category', {
                url: '/configuration/category',
                template: '<configuration-category-posts></configuration-category-posts>',
                params: {
                    sourceId: null,
                    categoryId: null
                },
                resolve: {

                }
            })*/


            .state('app.sourceManager', {
                url: '/sourceManager',
                template: '<source-manager></source-manager>',
                resolve: {
                    authorized: [
                        '$q', '$rootScope',
                        function($q, $rootScope){
                            var defer = $q.defer();
                            sectionClass.isAuthorized($rootScope.userInfo, 'sourceManager')
                                .then(function(isAuthorized){
                                    defer.resolve(isAuthorized);
                                })
                                .catch(function(err){defer.reject(err)});
                            return defer.promise;
                        }]
                }
            })


            /*
             * Category Related States
             * */

            .state('app.categories', {
                url: '/categories',
                template: '<categories></categories>',
                resolve: {
                    authorized: [
                        '$q', '$rootScope',
                        function($q, $rootScope){
                            var defer = $q.defer();
                            sectionClass.isAuthorized($rootScope.userInfo, 'categories')
                                .then(function(isAuthorized){
                                    defer.resolve(isAuthorized);
                                })
                                .catch(function(err){defer.reject(err);});
                            return defer.promise;
                        }]
                }
            })



            /*
             * Orion Related State
             * */
            .state('app.orion', {
                url: '/orionTasks',
                template: '<orion></orion>',
                resolve: {
                    authorized: [
                        '$q', '$rootScope',
                        function($q, $rootScope){
                            var defer = $q.defer();
                            sectionClass.isAuthorized($rootScope.userInfo, 'orion')
                                .then(function(isAuthorized){
                                    defer.resolve(isAuthorized);
                                })
                                .catch(function(err){defer.reject(err);});
                            return defer.promise;
                        }]
                }
            })

            /*
             * Security Related State
             * */

            .state('app.security', {
                url: '/security',
                template: '<ui-view></ui-view>',
                abstract: true,
                resolve: {
                    authorized: [
                        '$q', '$rootScope',
                        function($q, $rootScope){
                            var defer = $q.defer();
                            sectionClass.isAuthorized($rootScope.userInfo, 'security')
                                .then(function(isAuthorized){
                                    defer.resolve(isAuthorized);
                                })
                                .catch(function(err){defer.reject(err);});
                            return defer.promise;
                        }],
                    usersArray: [function(){
                        var userClass = new User();
                        var usersArray = userClass.db.atomicArray;
                        usersArray.$on({
                            'initialLotSize': 1000000
                        });
                        return usersArray;
                    }],
                    sectionsArray: [function(){
                        var sectionsArray = sectionClass.db.atomicArray;
                        sectionsArray.$on({
                            'initialLotSize': 1000000
                        });
                        return sectionsArray;
                    }]
                }
            })

            .state('app.security.users', {
                url: '/users',
                template: '<security-users users-array="$resolve.usersArray" sections-array="$resolve.sectionsArray"></security-users>',
                resolve: {

                }
            })

            .state('app.security.sections', {
                url: '/sections',
                template: '<security-sections sections-array="$resolve.sectionsArray"></security-sections>',
                resolve: {

                }
            })

            .state('app.security.apiKeys', {
                url: '/apiKeys',
                template: '<security-api-keys></security-api-keys>',
                resolve: {

                }
            })

    }]);