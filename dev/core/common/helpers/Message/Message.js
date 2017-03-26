/**
 * Created by Jess on 14-Jun-16.
 */

app.controller('ToastCtrl',
    ['$scope', '$mdToast',
        function($scope, $mdToast) {
            $scope.closeToast = function() {
                $mdToast.hide();
                $scope.toastText = '';
                $scope.toastTheme = '';
            };
        }])
    .factory('Message',
    ['$mdToast',
    function($mdToast){
        return{
            toast: function(toastObj){
                $mdToast.show({
                    hideDelay   : 4500,
                    position    : 'top right',
                    controller  : 'ToastCtrl',
                    template    :
                    '<md-toast>'+
                    '<div class="md-toast-content ' + toastObj.theme + '">'+
                    '<span class="md-toast-text" flex>' + toastObj.text + '</span>'+
                    '<md-button ng-click="closeToast()" class="md-icon-button">'+
                    '<md-icon aria-label="close" class="material-icons step">close</md-icon>'+
                    '</md-button>'+
                    '</div>'+
                    '</md-toast>'
                });
            }
        }
    }]);

