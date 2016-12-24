/**
 * Created by Jess on 14-Oct-16.
 */

app.component('accountCreation', {
    templateUrl: '/core/components/intro/accountCreation.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope','$state','Message','UserService',
        function($rootScope, $scope, $state, Message, UserService){
            $scope.user = {};
            $scope.submitting = false;

            $scope.createEmailAccount = function(){
                $scope.submitting = true;
                $scope.user.provider = 'email';
                UserService.emailExists($scope.user.email).then(function(exists){
                    if(exists){
                        Message.toast({text: 'El email que ingresaste ya se encuentra registrado.', theme: 'toast-red'});
                        $scope.submitting = false;
                    }else{
                        UserService.createAccount($scope.user).then(function(){
                            Message.toast({text: 'Tu cuenta ha sido creada exitosamente.', theme: 'toast-green'});
                            $scope.submitting = false;
                        }).catch(function(err){
                            Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                            console.log(err);
                            $scope.submitting = false;
                        });
                    }
                }).catch(function(err){
                    switch(err.code) {
                        case "auth/email-already-in-use":
                            Message.toast({text: 'El email ingresado ya esta siendo usado por otro usuario.', theme: 'toast-red'});
                            break;
                        case "auth/invalid-email":
                            Message.toast({text: 'Correo electronico invalido.', theme: 'toast-red'});
                            break;
                        case "auth/operation-not-allowed":
                            Message.toast({text: 'La operacion no fue posible.', theme: 'toast-red'});
                            break;
                        case "auth/weak-password":
                            Message.toast({text: 'La contrasena no es suficientemente fuerte.', theme: 'toast-red'});
                            break;
                        default:
                            Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                            break;
                    }
                    $scope.submitting = false;
                });
            };

            $scope.signIn = function(){
                $rootScope.$broadcast('signingIn');
            };
        }]
});

