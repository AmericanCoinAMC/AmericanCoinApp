/**
 * Created by Computadora on 14-Jan-17.
 */
app.directive('sourceCategoryUrls',
    ['$timeout', 'Message', '$window', function($timeout, Message, $window){
            return {
                restrict: 'E',
                scope: {
                    source: '=',
                    category: '='
                },
                templateUrl: '/core/components/app/sources/configuration/categories/urls.html',
                link: function(scope, element, attrs) {


                    scope.add = function(){
                        scope.sourceCategoryUrlClass.create({
                            url: scope.categoryUrlInput
                        })
                            .then(function(){
                                scope.cancel();
                            })
                            .catch(function(err){
                                console.log(err);
                                Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                                scope.cancel();
                            });
                    };

                    scope.remove = function(item){
                        scope.sourceCategoryUrlClass.remove(item)
                            .then(function(){
                                scope.cancel();
                            })
                            .catch(function(err){
                                console.log(err);
                                Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                                scope.cancel();
                            });
                    };

                    scope.loadUrl = function(url){
                        $window.open(url,'_blank');
                    };




                    scope.cancel = function(){
                        scope.categoryUrlInput = '';
                    };

                    /*
                     * Watchers
                     * */

                    scope.$watch('source', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.source = newValue;

                            if(scope.source && scope.category){
                                scope.sourceCategoryUrlClass = new SourceCategoryUrl(scope.source, scope.category);
                                scope.atomicArray = scope.sourceCategoryUrlClass.db.atomicArray;
                                scope.atomicArray
                                    .$on({
                                        initialLotSize: 1000
                                    })
                                    .then(function(instanceID){
                                        document.addEventListener(instanceID + '_apply_filters', function () {
                                            $timeout(function(){});
                                        }, false);
                                        $timeout(function(){});
                                    });
                            }
                        }
                    }, true);

                    scope.$watch('category', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.category = newValue;
                        }
                    }, true);

                }
            }
        }]);