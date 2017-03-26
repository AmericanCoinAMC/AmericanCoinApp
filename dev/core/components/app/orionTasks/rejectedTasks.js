/**
 * Created by Computadora on 07-Feb-17.
 */
app.component('orionRejectedTasks', {
    templateUrl: '/core/components/app/orionTasks/rejectedTasks.html',
    controller: [
        '$rootScope','$scope', '$mdBottomSheet',
        function($rootScope, $scope, $mdBottomSheet){


            $scope.taskInformation =  function(task){
                $mdBottomSheet.show({
                    templateUrl: '/core/components/app/orionTasks/taskInformationSheet.html',
                    escapeToClose: true,
                    disableBackdrop: false,
                    clickOutsideToClose: true,
                    disableParentScroll: false,
                    locals: {
                        task: task
                    },
                    controller:
                        ['$scope', '$mdBottomSheet', 'task',
                            function($scope, $mdBottomSheet, task){
                                $scope.task = task;

                                $scope.hide = function(){
                                    $mdBottomSheet.hide();
                                };

                            }]
                }).then(function(clickedItem) {

                });
            }

        }]
});

