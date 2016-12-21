/**
 * Created by Jess on 05-Jun-16.
 */

app.component('headingBar', {
    templateUrl: '/core/components/app/layout/headingBar.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope','UserService','SideNavigation','FeedService','$timeout','$mdBottomSheet',
        function($rootScope, $scope, UserService, SideNavigation, FeedService, $timeout, $mdBottomSheet){
        $scope.themes = [
            {alias: 'Rojo', name: 'red'},
            {alias: 'Rosado', name: 'pink'},
            {alias: 'Morado', name: 'deep-purple'},
            {alias: 'Indigo', name: 'indigo'},
            {alias: 'Azul', name: 'blue'},
            {alias: 'Verde', name: 'green'}
        ];

        $scope.showThemeSheet = function() {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: '/core/components/app/layout/themeColors.html',
                disableBackdrop: false,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    themes: $scope.themes
                },
                controller: function($scope, themes, Message){
                    $scope.themes = themes;
                    $scope.changeTheme = function(theme){
                        if($rootScope.firebaseUser.uid != undefined){
                            var ref = rootRef.child('users/' + $rootScope.firebaseUser.uid);
                            ref.update({theme: theme}).then(function(){
                                $mdBottomSheet.hide();
                                $timeout(function () {$rootScope.userInfo.theme = theme;});
                            }).catch(function(err){
                                console.log(err);
                            });
                        }
                    };
                }
            }).then(function(clickedItem) {

            }).catch(function(err){
                console.log(err);
            });
        };



        $scope.toggleLeftNav = function(){
            SideNavigation.toggle('left');

        };

        $scope.signUserOut = function(){
            UserService.signOut();
        }
    }]
});


