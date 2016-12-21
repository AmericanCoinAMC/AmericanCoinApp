/**
 * Created by Jess on 14-Oct-16.
 */

app.component('authenticate', {
    templateUrl: '/core/components/intro/authenticate.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope','$state','Message','UserService','Auth',
        function($rootScope, $scope, $state, Message, UserService, Auth){
        $scope.email = '';
        $scope.password = '';
        $scope.submitting = false;

        $scope.emailAuthentication = function(){
            $rootScope.preloader = true;
            $scope.submitting = true;
            Auth.$signInWithEmailAndPassword($scope.email,$scope.password)
                .then(function(){
                    $state.go('app.main');
                    $scope.submitting = false;
                    $rootScope.preloader = false;
                }).catch((function(err){
                console.log(err);
                Message.toast({text: 'Email o Contrasena incorrecto.', theme: 'toast-red'});
                $scope.submitting = false;
                $rootScope.preloader = false;
            }).bind(this));
        }
    }]
});

