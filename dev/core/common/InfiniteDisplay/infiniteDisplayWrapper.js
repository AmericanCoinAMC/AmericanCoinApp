/**
 * Created by Computadora on 24-Dec-16.
 */

/**
 * Created by Computadora on 12-Dec-16.
 */

app.directive('infiniteDisplayWrapper',
    ['InfiniteDisplay', 'InfiniteDisplayFilters', 'InfiniteDisplaySort', '$timeout', '$http', '$q', '$rootScope', 'angularGridInstance',
        function(InfiniteDisplay, InfiniteDisplayFilters, InfiniteDisplaySort, $timeout, $http, $q, $rootScope, angularGridInstance){
            return {
                restrict: 'E',
                scope: {
                    config: '='
                },
                template: '<div ng-include="getWrapperUrl()"></div>',
                link: function(scope, element, attrs) {
                    scope.parentScope = scope.config.parentScope || null;
                    scope.filters = scope.config.filters || false;
                    scope.dataSort = scope.config.dataSort || 'desc';
                    scope.contentLoaded = false;


                    /*
                     * Main Initializer
                     * */

                    scope.initialize = function(){
                        var deferred = $q.defer();
                        scope.initView();
                        scope.initAgConfig();
                        scope.initInstanceObject();
                        scope.InfiniteDisplay = new InfiniteDisplay(scope.instanceObject);
                        scope.initDeactivators();
                        scope.InfiniteDisplay.initialize().then(function(){
                            if(scope.viewObject.delayedStart){
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

                    /*
                     * Secondary Initializers
                     * */

                    scope.initView = function(){
                        scope.viewObject = {
                            parentContainer: scope.config.parentContainer || '.views-container',
                            distance : scope.config.distance || 2,
                            templateUrl: scope.config.templateUrl,
                            delayedStart: scope.config.delayedStart || false,
                            animation: scope.config.animation || false
                        };
                    };

                    scope.initAgConfig = function(){
                        scope.agConfig = {
                            gridWidth : scope.config.gridWidth || 300,
                            gutterSize : scope.config.gutterSize || 20,
                            refreshOnImgLoad : scope.config.refreshOnImgLoad || true
                        }
                    };

                    scope.initInstanceObject = function(){
                        scope.instanceObject = {
                            firstLotSize: scope.config.firstLotSize || 14,
                            nextLotSize: scope.config.nextLotSize || 16,
                            ref: scope.config.ref,
                            objectBuilder: scope.config.objectBuilder
                        };
                    };

                    scope.getWrapperUrl = function(){
                        var wrapperUrl = '';
                        if(scope.config.wrapper == 'infiniteScroll'){
                            wrapperUrl = '/core/common/InfiniteDisplay/infiniteScrollWrapper.html';
                        }else if(scope.config.wrapper == 'loadMore'){
                            wrapperUrl = '/core/common/InfiniteDisplay/loadMoreWrapper.html';
                        }
                        return wrapperUrl;
                    };

                    scope.initDeactivators = function(){
                        for(var i = 0; i < scope.config.deactivators.length; i++){
                            $rootScope.$on(scope.config.deactivators[i],function() {
                                scope.InfiniteDisplay.deactivate();
                            });
                        }
                    };




                    /*
                     * Items Processor
                     * */

                    scope.$watch('InfiniteDisplay.items', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.InfiniteDisplay.items = newValue;
                            $timeout(function(){
                                scope.InfiniteDisplay.items = scope.processItems();
                            });
                        }
                    }, true);


                    scope.processItems = function(){
                        var items = scope.InfiniteDisplay.getItems();
                        if(scope.filters){
                            for(var i = 0; i < scope.filters.length; i++){
                                items = items.filter(InfiniteDisplayFilters[scope.filters[i]])
                            }
                        }
                        items.sort(InfiniteDisplaySort[scope.dataSort]);
                        return items;
                    };

                    scope.initialize();
                }
            }
        }]);