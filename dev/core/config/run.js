/**
 * Created by Jess on 05-Jul-16.
 */

app.run(['$rootScope', '$state', '$stateParams', 'Auth', 'Message',
    '$mdMedia', 'SideNavigation', 'UserService', 'amMoment', '$window',
    function($rootScope, $state, $stateParams, Auth, Message,
             $mdMedia, SideNavigation, UserService, amMoment, $window) {
        amMoment.changeLocale('es');

        $rootScope.preloader = false;
        $rootScope.userAuthenticated = false;
        $rootScope.userInfo = {};
        $rootScope.firebaseUser = {};
        $rootScope.userFav = 'default.png';
        $rootScope.appContainer = 'views-container';

        $rootScope.navigatorLanguage = $window.navigator.language || $window.navigator.userLanguage;

        /*
        * Handle Auth Updates
        * */
        Auth.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser){
                $rootScope.userAuthenticated = true;
                $rootScope.firebaseUser = firebaseUser;
                UserService.getUserInfo($rootScope.firebaseUser.uid).then(function(userInfo){
                    $rootScope.userInfo = userInfo;
                    $rootScope.userFav = userInfo.preferences.theme + '.png';
                });
                if($state.current.name == 'intro'){
                    $state.go("app.minoticiero");
                }
            }else{
                $rootScope.userAuthenticated = false;
                $rootScope.firebaseUser = {};
                $rootScope.userInfo = {};
                $rootScope.userFav = 'default.png';
                $state.go('intro');
            }
        });

        $rootScope.$watch('userInfo' ,function(){
            if($rootScope.userInfo.preferences != undefined){
                $rootScope.userFav = $rootScope.userInfo.preferences.theme + '.png';
            }
        },true);




        /*
        * State changes handlers.
        * */

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                $rootScope.preloader = true;
                $rootScope.toState = toState;
                $rootScope.fromState = fromState;
                $rootScope.toStateParams = toParams;
                $rootScope.fromStateParams = fromParams;
            });

        $rootScope.$on("$stateChangeSuccess",
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.preloader = false;
                $rootScope.currentState = toState;
                var navToggle = $mdMedia('xs') || $mdMedia('sm') || $mdMedia('md');
                if(navToggle){SideNavigation.close('left')}
            });

        $rootScope.$on("$stateChangeError",
            function(event, toState, toParams, fromState, fromParams, error) {
                console.log('stateChangeError');
                console.log(error);
                if (error === "AUTH_REQUIRED") {
                    $state.go("intro");
                    $rootScope.preloader = false;
                }
            });

    }]);