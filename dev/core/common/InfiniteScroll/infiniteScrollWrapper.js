/**
 * Created by Computadora on 12-Dec-16.
 */

app.directive('infiniteScrollWrapper',
    ['IS01', 'IS02', '$templateCache', '$timeout', '$http', '$q', '$rootScope', 'angularGridInstance',
        function(IS01, IS02, $templateCache, $timeout, $http, $q, $rootScope, angularGridInstance){
            return {
                restrict: 'E',
                scope: {
                    config: '='
                },
                templateUrl: '/core/common/InfiniteScroll/infiniteScrollWrapper.html',
                link: function(scope, element, attrs) {
                    var instanceIS;

                    scope.configIS = {
                        gridWidth : scope.config.gridWidth || 250,
                        gutterSize : scope.config.gutterSize || 5,
                        refreshOnImgLoad : scope.config.gutterSize || true
                    };

                    if(IS01.isAvailable()){
                        instanceIS = IS01;
                    }else{
                        instanceIS = IS02;
                    }

                    scope.prepare = function(){
                        var deferred = $q.defer();
                        $http.get(scope.config.templateUrl, {
                            cache: true
                        }).then(function(resp){
                            $templateCache.put(scope.config.templateUrl, resp.data);
                            scope.setModuleConfig();
                            deferred.resolve(true);
                        }).catch(function(err){deferred.reject(err)});
                        return deferred.promise;
                    };


                    scope.prepare().then(function(){
                        instanceIS.initialize({
                            firstLotSize: scope.config.firstLotSize,
                            nextLotSize: scope.config.nextLotSize,
                            ref: scope.config.ref,
                            objectBuilder: scope.config.objectBuilder
                        }).then(function(){
                            if(scope.config.grid){
                                $timeout(function(){
                                    angularGridInstance.infiniteScrollGrid.refresh();
                                }, 1500);
                            }
                        }).catch(function(err){console.log(err);});
                    });

                    scope.nextLot = function(){
                        instanceIS.loadNextLot().then(function(){

                        }).catch(function(err){console.log(err);});
                    };

                    scope.setModuleConfig = function(){
                        scope.config = {
                            distance: scope.config.distance || 2,
                            parentContainer: scope.config.parentContainer || '.views-container',
                            firstLotSize: scope.config.firstLotSize || 14,
                            nextLotSize: scope.config.nextLotSize || 16,
                            template: $templateCache.get(scope.config.templateUrl) || null,
                            ref: scope.config.ref || null,
                            objectBuilder: scope.config.objectBuilder || null,
                            grid: scope.config.grid || null
                        };
                    };

                    /*
                    * Getters & Event Listeners
                    * */

                    scope.$watch('getItems()', function(newValue, oldValue) {
                        scope.items = newValue;
                    }, true);


                    scope.getItems = function(){
                        return instanceIS.getItems();
                    };

                    scope.fetching = function(){
                        return instanceIS.isFetching();
                    };

                    scope.firstLotLoaded = function(){
                        return instanceIS.isFirstLotLoaded();
                    };

                    scope.itemsRemaining = function(){
                        return instanceIS.itemsRemaining();
                    };

                    scope.getDisplayedTotal = function(){
                        return instanceIS.getDisplayedTotal();
                    };

                }
            }
        }]);