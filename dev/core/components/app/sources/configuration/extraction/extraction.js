/**
 * Created by Computadora on 17-Jan-17.
 */

app.directive('sourceExtractionConfig',
    ['$timeout', 'Message', function($timeout, Message){
        return {
            restrict: 'E',
            scope: {
                source: '='
            },
            templateUrl: '/core/components/app/sources/configuration/extraction/extraction.html',
            link: function(scope, element, attrs) {
                scope.loaded = false;


                scope.extractionTypes = {
                    facebookGraph: 'facebookGraph',
                    ogioOpenGraph: 'ogioOpenGraph',
                    ogioHybridGraph: 'ogioHybridGraph',
                    ogioHtmlInferred: 'ogioHtmlInferred'
                };


                scope.save = function(){
                    scope.sourceExtractionClass
                        .save(scope.atomicObject.item)
                        .then(function(){
                            Message.toast({text: 'Los cambios han sido guardados.', theme: 'toast-green'});
                        })
                        .catch(function(err){
                            Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                            console.log(err);
                        });
                };



                /*
                 * Watchers
                 * */

                scope.$watch('source', function(newValue, oldValue) {
                    if(newValue != undefined){
                        scope.source = newValue;

                        scope.sourceExtractionClass = new SourceExtraction(scope.source);

                        scope.atomicObject = new AtomicObject(scope.sourceExtractionClass.db);

                        scope.atomicObject.$on()
                            .then(function(instanceID){
                                scope.loaded = true;
                                document.addEventListener(instanceID + '_object_changed', function (newItem) {
                                    $timeout(function(){
                                        scope.atomicObject.item = newItem;
                                    });
                                }, false);
                            })
                            .catch(function(err){
                                Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                                console.log(err);
                            })

                    }
                }, true);

            }
        }
    }]);