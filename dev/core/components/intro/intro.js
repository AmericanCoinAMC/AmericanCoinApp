/**
 * Created by Jess on 14-Oct-16.
 */

app.component('intro', {
    templateUrl: '/core/components/intro/intro.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope', 'Message',
        function($rootScope, $scope, Message){
            $scope.user = {};
            $scope.submitting = false;

            var userClass = new User();

            $scope.signInWithEmail = function(){
                $scope.submitting = true;
                $scope.user.provider = 'email';
                userClass.signIn($scope.user).then(function(){
                    $scope.submitting = false;
                }).catch(function(err){
                    switch(err.code) {
                        case "auth/invalid-email":
                            Message.toast({text: 'El email ingresado es invalido.', theme: 'toast-red'});
                            break;
                        case "auth/user-disabled":
                            Message.toast({text: 'Tu cuenta se encuentra desabilitada.', theme: 'toast-red'});
                            break;
                        case "auth/user-not-found":
                            Message.toast({text: 'Debes crear una cuenta para poder inciiar sesion.', theme: 'toast-red'});
                            break;
                        case "auth/wrong-password":
                            Message.toast({text: 'Correo electronico o contrasena incorrectos.', theme: 'toast-red'});
                            break;
                        default:
                            Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                            break;
                    }
                    console.log(err);
                    $scope.submitting = false;
                })
            }


        }]
});

