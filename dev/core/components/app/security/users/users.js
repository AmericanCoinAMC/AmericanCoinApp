/**
 * Created by Jess on 05-Jun-16.
 */
app.component('securityUsers', {
    templateUrl: '/core/components/app/security/users/users.html',
    bindings: {

    },
    controller: [
        '$scope', '$timeout', '$window', '$rootScope', 'Dialog',
        function($scope, $timeout, $window, $rootScope, Dialog){
            var userClass = new User();
            $scope.config = {
                atomicArray: userClass.db.atomicArray,
                parentScope: $scope,
                initialLotSize: 1000,
                nextLotSize: 1000,
                templateUrl: '/core/components/app/security/users/users.tpl.html',
                wrapper: 'infiniteScroll',
                animation: {
                    type: 'entrance',
                    in: 'zoomIn',
                    out: 'zoomOut'
                }
            };

            var sectionClass = new Section();
            $scope.sectionsArray = sectionClass.db.atomicArray;

            $scope.sectionsArray.$on({initialLotSize: 1000}).then(function(instanceID){
                document.addEventListener(instanceID + '_apply_filters', function () {$timeout(function(){})}, false);
            });


            $scope.userSelected = false;
            $scope.selectedUser = {};

            $scope.submitting = false;


            /*
             * CRUDs
             * */

            $scope.updateAdmin = function(){
                $scope.submitting = true;
                $scope.selectedUser.isAdmin = true;
                userClass.db.query.update($scope.selectedUser).then(function(){
                    $scope.cancel();
                });
            };

            $scope.demoteAdmin = function(){
                $scope.submitting = false;
                $scope.selectedUser.isAdmin = false;
                $scope.selectedUser.authority = 0;
                userClass.db.query.update($scope.selectedUser).then(function(){
                    $scope.cancel();
                });
            };

            $scope.selectUser = function(event, user){
                $scope.selectedUser = user;
                $scope.showForm();
            };

            $scope.showForm = function(){
                Dialog.show(event, $scope, {templateUrl: '/core/components/app/security/users/userForm.html'});
            };



            $rootScope.$on('queryUpdate', function(event, newQuery) {
                $scope.query = newQuery;
            });




            $scope.cancel = function(){
                $scope.userSelected = false;
                $scope.selectedUser = {};
                $scope.submitting = false;
                Dialog.hide();
            }
        }]
});