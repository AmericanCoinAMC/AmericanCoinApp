/**
 * Created by Computadora on 24-Dec-16.
 */

/**
 * Created by Computadora on 12-Dec-16.
 */

app.directive('infiniteDisplayWrapper',
    ['InstanceManager', '$timeout', '$http', '$q', '$rootScope', 'angularGridInstance',
        function(InstanceManager, $timeout, $http, $q, $rootScope, angularGridInstance){
            return {
                restrict: 'E',
                scope: {
                    config: '='
                },
                template: '<div ng-include="initWrapper()"></div>',
                link: function(scope, element, attrs) {
                    scope.instanceIS = InstanceManager.getInstance(scope.config.instanceType);
                    scope.params = {};
                    scope.controller = {};
                    scope.filterEnabled = false;
                    scope.dataFilters = [];
                    scope.contentLoaded = false;

                    /*
                     * Secondary Initializers
                     * */

                    if(scope.config.dataFilter != undefined){
                        scope.dataFilters.push(scope.config.dataFilter);
                        scope.filterEnabled = true;
                    }

                    if(scope.config.builtInFilters != undefined){
                        for(var i = 0; i < scope.config.builtInFilters.length; i++){
                            switch(scope.config.builtInFilters[i]){
                                case 'activeSources':
                                    scope.dataFilters.push(function(post){
                                        return post.source.status.active;
                                    });
                                    break;
                                case 'userIgnoredSources':
                                    scope.dataFilters.push(function(post){
                                        var isIgnored = scope.params.userIgnoredSources.isIgnored(post.source);
                                        return !isIgnored;
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                        scope.filterEnabled = true;
                    }

                    if(scope.config.controller != undefined){
                        scope.controller = scope.config.controller;
                    }

                    scope.initWrapper = function(){
                        var wrapperUrl = '';
                        if(scope.config.wrapper == 'infiniteScroll'){
                            wrapperUrl = '/core/common/InfiniteDisplay/infiniteScrollWrapper.html';
                        }else if(scope.config.wrapper == 'loadMore'){
                            wrapperUrl = '/core/common/InfiniteDisplay/loadMoreWrapper.html';
                        }
                        return wrapperUrl;
                    };


                    scope.initParams = function(){
                        if(scope.config.params != undefined){
                            angular.forEach(scope.config.params, function(val, key) {
                                scope.params[key] = val;
                            });
                        }
                    };

                    scope.initConfigAg = function(){
                        scope.configAg = {
                            parentContainer: scope.config.parentContainer || '.views-container',
                            distance : scope.config.distance || 2,
                            gridWidth : scope.config.gridWidth || 300,
                            gutterSize : scope.config.gutterSize || 20,
                            refreshOnImgLoad : scope.config.refreshOnImgLoad || true,
                            templateUrl: scope.config.templateUrl,
                            delayedStart: scope.config.delayedStart || false,
                            animation: scope.config.animation || false
                        };
                    };

                    scope.initInstanceObject = function(){
                        scope.instanceObject = {
                            firstLotSize: scope.config.firstLotSize || 14,
                            nextLotSize: scope.config.nextLotSize || 16,
                            ref: scope.config.ref,
                            objectBuilder: scope.config.objectBuilder,
                            dataFilter: scope.config.dataFilter || false
                        };
                    };


                    /*
                    * Next & Previous Retrievers
                    * */
                    scope.nextLot = function(){
                        scope.instanceIS.loadNextLot().then(function(){

                        }).catch(function(err){console.log(err);});
                    };



                    /*
                     * Getters & Event Listeners
                     * */

                     if(scope.filterEnabled){
                        scope.$watch('getItemsWithFilters()', function(newValue, oldValue) {
                            if(newValue != undefined){
                                scope.items = newValue;
                            }
                        }, true);
                    }else{
                        scope.$watch('getItems()', function(newValue, oldValue) {
                            if(newValue != undefined){
                                scope.items = newValue;
                            }
                        }, true);
                    }


                    scope.getItems = function(){
                        return scope.instanceIS.getItems();
                    };

                    scope.getItemsWithFilters = function(){
                        var items = scope.instanceIS.getItems();
                        for(var i = 0; i < scope.dataFilters.length; i++){
                            items = items.filter(scope.dataFilters[i])
                        }
                        return items;
                    };

                    scope.fetching = function(){
                        return scope.instanceIS.isFetching();
                    };

                    scope.firstLotLoaded = function(){
                        return scope.instanceIS.isFirstLotLoaded();
                    };

                    scope.itemsRemaining = function(){
                        return scope.instanceIS.itemsRemaining();
                    };

                    scope.getDisplayedTotal = function(){
                        return scope.instanceIS.getDisplayedTotal();
                    };




                    /*
                    * Main Initializer
                    * */

                    scope.initialize = function(){
                        var deferred = $q.defer();
                        scope.initConfigAg();
                        scope.initParams();
                        scope.initInstanceObject();
                        scope.instanceIS.initialize(scope.instanceObject).then(function(){
                            if(scope.configAg.delayedStart){
                                $timeout(function(){
                                    if(scope.config.grid){
                                        $timeout(function(){
                                            if(angularGridInstance.infiniteScrollGrid != undefined){
                                                angularGridInstance.infiniteScrollGrid.refresh();
                                            }
                                            scope.contentLoaded = true;
                                            deferred.resolve(true);
                                        }, 1500);
                                    }else{
                                        scope.contentLoaded = true;
                                        deferred.resolve(true);
                                    }
                                }, 500);
                            }else{
                                if(scope.config.grid){
                                    $timeout(function(){
                                        if(angularGridInstance.infiniteScrollGrid != undefined){
                                            angularGridInstance.infiniteScrollGrid.refresh();
                                        }
                                        scope.contentLoaded = true;
                                        deferred.resolve(true);
                                    }, 1500);
                                }else{
                                    scope.contentLoaded = true;
                                    deferred.resolve(true);
                                }
                            }
                        }).catch(function(err){console.log(err);});
                        return deferred.promise;
                    };

                    scope.initialize();
                 }
            }
        }]);