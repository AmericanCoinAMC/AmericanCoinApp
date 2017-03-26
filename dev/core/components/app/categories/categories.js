/**
 * Created by Computadora on 13-Jan-17.
 */
/**
 * Created by Jess on 23-Jun-16.
 */
app.component('categories', {
    templateUrl: '/core/components/app/categories/categories.html',
    bindings: {

    },
    controller: [
        '$rootScope', '$scope', 'Dialog', 'Message', '$timeout',
        function($rootScope, $scope, Dialog, Message, $timeout){

            /*
             * Module Init
             * */
            var categoryClass = new Category();



            /*
            * Atomic Array Init
            * */


            $scope.config = {
                atomicArray: categoryClass.db.atomicArray,
                parentScope: $scope,
                initialLotSize: 1000,
                nextLotSize: 1000,
                templateUrl: '/core/components/app/categories/categories.tpl.html',
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
                    categoryClass.create($scope.selectedItem)
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
                    categoryClass.alter($scope.selectedItem)
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
                categoryClass.remove(item)
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
                    templateUrl: '/core/components/app/categories/categoryForm.html'
                };
                Dialog.show(event, $scope, showConfig);
            };


            /*
            * Order
            * */

            $scope.moveToFirst = function(item){
                $rootScope.preloader = true;
                categoryClass.moveToFirst(item)
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
                categoryClass.moveBefore(item, previousToItem)
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
                categoryClass.moveNext(item, nextToItem)
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
                categoryClass.moveToLast(item)
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
        }]


});

