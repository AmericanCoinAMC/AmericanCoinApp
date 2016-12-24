/**
 * Created by Computadora on 23-Dec-16.
 */
/**
 * Created by cem on 15-Oct-16.
 */

app.component('preferences', {
    templateUrl: '/core/components/app/preferences/preferences.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope', '$mdBottomSheet', '$timeout', 'angularGridInstance',
        function($rootScope, $scope, $mdBottomSheet, $timeout, angularGridInstance){
            $scope.themes = [
                {alias: 'Rojo', name: 'red'},
                {alias: 'Rosado', name: 'pink'},
                {alias: 'Morado', name: 'deep-purple'},
                {alias: 'Indigo', name: 'indigo'},
                {alias: 'Azul', name: 'blue'},
                {alias: 'Verde', name: 'green'}
            ];

            $scope.toggleCardSize = function(){
                if($rootScope.userInfo.preferences.card == 'compress'){
                    $rootScope.userInfo.preferences.card = 'expand';
                }else if($rootScope.userInfo.preferences.card == 'expand'){
                    $rootScope.userInfo.preferences.card = 'compress';
                }
                var ref = rootRef.child('users/' + $rootScope.userInfo.$id + '/preferences/card/');
                ref.set($rootScope.userInfo.preferences.card).then(function(){
                    angularGridInstance.infiniteScrollGrid.refresh();
                }).catch(function(err){
                    console.log(err);
                });
            };

            $scope.showThemeSheet = function() {
                $mdBottomSheet.show({
                    templateUrl: '/core/components/app/layout/themeColors.html',
                    disableBackdrop: false,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    locals: {
                        themes: $scope.themes
                    },
                    controller: ['$scope', 'themes', 'Message',
                        function($scope, themes, Message){
                            $scope.themes = themes;
                            $scope.changeTheme = function(theme){
                                if($rootScope.firebaseUser.uid != undefined){
                                    var ref = rootRef.child('users/' + $rootScope.firebaseUser.uid + '/preferences/theme');
                                    ref.set(theme).then(function(){
                                        $mdBottomSheet.hide();
                                        $timeout(function () {$rootScope.userInfo.preferences.theme = theme;});
                                    }).catch(function(err){
                                        console.log(err);
                                    });
                                }
                            };
                        }]
                }).then(function(clickedItem) {

                }).catch(function(err){
                    console.log(err);
                });
            };
        }]
});
