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
                {alias: 'Rosado', name: 'pink'},

                {alias: 'Rojo', name: 'red'},
                {alias: 'Naranja Oscuro', name: 'deep-orange'},
                {alias: 'Naranja', name: 'orange'},
                {alias: 'Amber', name: 'amber'},

                {alias: 'Lima', name: 'lime'},
                {alias: 'Verde Claro', name: 'light-green'},
                {alias: 'Verde', name: 'green'},
                {alias: 'Teal (Mi Noticiero)', name: 'teal'},

                {alias: 'Cyan', name: 'cyan'},
                {alias: 'Azul Claro', name: 'light-blue'},
                {alias: 'Azul', name: 'blue'},

                {alias: 'Indigo', name: 'indigo'},
                {alias: 'Morado Oscuro', name: 'deep-purple'},
                {alias: 'Morado', name: 'purple'},

                {alias: 'Gris', name: 'grey'},
                {alias: 'Azul Gris', name: 'blue-grey'},
                {alias: 'Marrón', name: 'brown'}
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
                    templateUrl: '/core/components/app/preferences/themeColors.html',
                    disableBackdrop: false,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    locals: {
                        themes: $scope.themes
                    },
                    controller: ['$scope', 'themes', '$rootScope',
                        function($scope, themes, $rootScope){
                            $scope.themes = themes;
                            $scope.changeTheme = function(theme){
                                if($rootScope.firebaseUser.uid != undefined){
                                    var ref = rootRef.child('users/' + $rootScope.firebaseUser.uid + '/preferences/theme');
                                    ref.set(theme).then(function(){
                                        $rootScope.userInfo.preferences.theme = theme;
                                        $mdBottomSheet.hide();
                                        $timeout(function () {$rootScope.userInfo.preferences.theme = theme;});
                                    }).catch(function(err){
                                        console.log(err);
                                    });
                                }
                            };
                            $scope.hide = function(){
                                $mdBottomSheet.hide();
                            };
                        }]
                }).then(function(clickedItem) {

                }).catch(function(err){
                    console.log(err);
                });
            };

            $scope.showSizeSheet = function() {
                if($rootScope.firebaseUser.uid != undefined){
                    $mdBottomSheet.show({
                        templateUrl: '/core/components/app/preferences/sizing.html',
                        disableBackdrop: false,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        controller: ['$scope', '$rootScope',
                            function($scope, $rootScope){
                                $scope.changeSize = function(size){
                                    if($rootScope.firebaseUser.uid != undefined){
                                        var ref = rootRef.child('users/' + $rootScope.firebaseUser.uid + '/preferences/card');
                                        ref.set(size).then(function(){
                                            $rootScope.userInfo.preferences.card = size;
                                            if(angularGridInstance.infiniteScrollGrid != undefined){
                                                angularGridInstance.infiniteScrollGrid.refresh();
                                            }
                                            $mdBottomSheet.hide();
                                            $timeout(function () {$rootScope.userInfo.preferences.card = size;});
                                        }).catch(function(err){
                                            console.log(err);
                                        });
                                    }
                                };
                                $scope.hide = function(){
                                    $mdBottomSheet.hide();
                                };
                            }]
                    }).then(function(clickedItem) {

                    }).catch(function(err){
                        console.log(err);
                    });
                }
            };
        }]
});
