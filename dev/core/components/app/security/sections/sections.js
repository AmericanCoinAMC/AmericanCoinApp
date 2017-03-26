/**
 * Created by Jess on 05-Jun-16.
 */
app.component('securitySections', {
    templateUrl: '/core/components/app/security/sections/sections.html',
    bindings: {

    },
    controller: ['$scope', 'Dialog', '$rootScope', 'Message', function($scope, Dialog, $rootScope, Message){
        var sectionClass = new Section();


        $scope.config = {
            atomicArray: sectionClass.db.atomicArray,
            parentScope: $scope,
            initialLotSize: 1000,
            nextLotSize: 1000,
            templateUrl: '/core/components/app/security/sections/sections.tpl.html',
            wrapper: 'infiniteScroll',
            animation: {
                type: 'entrance',
                in: 'zoomIn',
                out: 'zoomOut'
            }
        };

        $scope.sectionSelected = false;
        $scope.selectedSection = {};

        $scope.query = '';
        $scope.searching = false;

        $scope.saveSection = function(){
            if($scope.sectionSelected){
                sectionClass.db.query.update($scope.selectedSection)
                    .then(function(){
                        $scope.cancel();
                    })
                    .catch(function(err){
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                        console.log(err);
                        $scope.cancel();
                    });
            }else{
                sectionClass.db.query.create($scope.selectedSection)
                    .then(function(){
                        $scope.cancel();
                    })
                    .catch(function(err){
                        Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                        console.log(err);
                        $scope.cancel();
                    });
            }
        };

        $scope.removeSection = function(section){
            sectionClass.db.query.remove(section)
                .then(function(){
                    $scope.cancel();
                })
                .catch(function(err){
                    Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                    console.log(err);
                    $scope.cancel();
                });
        };

        $scope.selectSection = function($event, section){
            $scope.selectedSection = section;
            $scope.sectionSelected = true;
            $scope.showSectionForm($event);
        };

        $scope.showSectionForm = function(ev) {
            var showConfig = {
                templateUrl: 'core/components/app/security/sections/sectionForm.html',
                customFullscreen: true
            };
            Dialog.show(ev, $scope, showConfig);
        };

        $scope.confirmRemoval = function(ev, section) {
            var confirmData = {
                title: 'Eliminar Sección',
                textContent: 'Estas seguro que deseas eliminar "' + section.name + '"?',
                okText: 'Eliminar',
                cancelText: 'Cancelar'
            };
            Dialog.confirm(ev, confirmData).then(function(response){
                if(response){
                    $scope.removeSection(section);
                }
            });
        };


        $scope.cancel = function(){
            $scope.sectionSelected = false;
            $scope.selectedSection = {};
            Dialog.hide();
        };

        $rootScope.$on('queryUpdate', function(event, newQuery) {
            $scope.query = newQuery;
        });
    }]
});