/**
 * Created by Jess on 14-Oct-16.
 */
app.component('sourceManager', {
    templateUrl: '/core/components/app/sources/sourceManager.html',
    controller: [
        '$rootScope','$scope', '$timeout', 'Dialog', '$window',
        function($rootScope, $scope, $timeout, Dialog, $window){
            var self = this;
            var sourceClass = new Source();

            /*
            * Atomic Array
            * */
            $scope.config = {
                atomicArray: sourceClass.db.atomicArray,
                parentScope: $scope,
                initialLotSize: 1000,
                nextLotSize: 1000,
                templateUrl: '/core/components/app/sources/sourceManager.tpl.html',
                wrapper: 'infiniteScroll',
                animation: {
                    type: 'entrance',
                    in: 'zoomIn',
                    out: 'zoomOut'
                }
            };



            /*
             * DOM init
             * */

            $scope.itemSelected = false;
            $scope.selectedItem = {};

            $scope.updateFile = false;

            $scope.submitting = false;


            /*
             * CRUD
             * */
            $scope.save = function(){
                if($scope.itemSelected){
                    $scope.update();
                }else{
                    $scope.create();
                }
            };

            $scope.create = function(){
                $scope.submitting = true;
                if($scope.files[0] == undefined){
                    $scope.selectedItem.file = false;
                }else{
                    $scope.selectedItem.file = $scope.files[0].lfFile;
                }
                if($scope.selectedItem.file){
                    sourceClass.create($scope.selectedItem)
                        .then(function(snapshotKey){
                            $scope.cancel();
                        })
                        .catch(function(err){
                            console.log(err);
                            Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                            $scope.cancel();
                        })
                }else{
                    $scope.submitting = false;
                    Message.toast({text: 'Debes subir una imagen.', theme: 'toast-warning'});
                }
            };

            $scope.update = function(){
                $scope.submitting = true;
                $scope.selectedItem.updateFile = $scope.updateFile;
                if($scope.files[0] == undefined){
                    $scope.selectedItem.file = false;
                }else{
                    $scope.selectedItem.file = $scope.files[0].lfFile;
                }
                var valid = false;
                if($scope.updateFile && $scope.selectedItem.file || !$scope.updateFile && !$scope.selectedItem.file){
                    valid = true;
                }else{
                    valid = false;
                }
                if(valid){
                    sourceClass.alter($scope.selectedItem)
                        .then(function(){
                            $scope.cancel();
                        })
                        .catch(function(err){
                            console.log(err);
                            Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                            $scope.cancel();
                        })
                }else{
                    $scope.submitting = false;
                    Message.toast({text: 'Debes subir una imagen o cancelar el cambio de imagen.', theme: 'toast-warning'});
                }
            };

            $scope.remove = function(item){
                $rootScope.submitting = true;
                sourceClass.remove(item)
                    .then(function(){
                        $scope.cancel();
                    })
                    .catch(function(err){
                        console.log(err);
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                        $scope.cancel();
                    })
            };

            $scope.selectItem = function(event, item){
                $scope.itemSelected = true;
                $scope.selectedItem = item;
                $scope.showForm(event);
            };

            $scope.showForm = function(event){
                if($scope.itemSelected.autoSave == undefined) $scope.itemSelected.autoSave = false;
                var showConfig = {
                    templateUrl: '/core/components/app/sources/sourceForm.html'
                };
                Dialog.show(event, $scope, showConfig);
            };


            /*
             * Order
             * */

            $scope.moveToFirst = function(item){
                $rootScope.preloader = true;
                sourceClass.moveToFirst(item)
                    .then(function(){
                        $timeout(function(){
                            $scope.cancel();
                        });
                    })
                    .catch(function(err){
                        console.log(err);
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                        $scope.cancel();
                    })
            };

            $scope.moveBefore = function(item, previousToItem){
                $rootScope.preloader = true;
                sourceClass.moveBefore(item, previousToItem)
                    .then(function(){
                        $timeout(function(){
                            $scope.cancel();
                        });
                    })
                    .catch(function(err){
                        console.log(err);
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                        $scope.cancel();
                    })
            };

            $scope.moveNext = function(item, nextToItem){
                $rootScope.preloader = true;
                sourceClass.moveNext(item, nextToItem)
                    .then(function(){
                        $timeout(function(){
                            $scope.cancel();
                        });
                    })
                    .catch(function(err){
                        console.log(err);
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                        $scope.cancel();
                    })
            };

            $scope.moveToLast = function(item){
                $rootScope.preloader = true;
                sourceClass.moveToLast(item)
                    .then(function(){
                        $timeout(function(){
                            $scope.cancel();
                        });
                    })
                    .catch(function(err){
                        console.log(err);
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                        $scope.cancel();
                    })
            };


            /*
             * File Update
             * */

            $scope.changeFile = function(){
                $scope.updateFile = true;
            };

            $scope.cancelFileChange = function(){
                $scope.updateFile = false;
            };


            /*
             * Defaults setter
             * */
            $scope.cancel = function(){
                $rootScope.preloader = false;
                $scope.itemSelected = false;
                $scope.selectedItem = {};
                $scope.submitting = false;
                $scope.updateFile = false;

                Dialog.hide();
            };



            /*
             * Search
             * */

            $rootScope.$on('queryUpdate', function(event, newQuery) {
                $scope.query = newQuery;
            });





            /*
            * Configuration
            * */

            $scope.configuring = false;
            $scope.configSource = {};

            $scope.configureSource = function(source){
                $scope.configuring = true;
                $scope.configSource = source;
                $rootScope.$broadcast('startConfiguringSource', $scope.configSource);
            };

            $rootScope.$on('stopConfiguringSource', function () {
                $scope.configuring = false;
                $scope.configSource = {};
            });


            $scope.loadUrl = function(url){
                $window.open(url,'_blank');
            };

        }]
});


