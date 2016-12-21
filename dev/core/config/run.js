/**
 * Created by Jess on 05-Jul-16.
 */

app.run(['$rootScope', '$state', '$stateParams', 'Auth', 'Message', '$mdMedia', 'SideNavigation', 'UserService', 'amMoment',
    function($rootScope, $state, $stateParams, Auth, Message, $mdMedia, SideNavigation, UserService, amMoment) {
        amMoment.changeLocale('es');

        $rootScope.preloader = false;
        $rootScope.userAuthenticated = false;
        $rootScope.userInfo = {};
        $rootScope.firebaseUser = {};


        /*
        * Handle Auth Updates
        * */
        Auth.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser){
                $rootScope.userAuthenticated = true;
                $rootScope.firebaseUser = firebaseUser;
                UserService.getUserInfo($rootScope.firebaseUser.uid).then(function(userInfo){
                    $rootScope.userInfo = userInfo;
                });
                if($state.current.name == 'intro'){
                    $state.go("app.main");
                }
            }else{
                $rootScope.userAuthenticated = false;
                $rootScope.firebaseUser = {};
                $rootScope.userInfo = {};
                $state.go('intro');
            }
        });



        /*
        * State changes handlers.
        * */

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                $rootScope.preloader = true;
                $rootScope.toState = toState;
                $rootScope.toStateParams = toParams;
            });

        $rootScope.$on("$stateChangeSuccess",
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.preloader = false;
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