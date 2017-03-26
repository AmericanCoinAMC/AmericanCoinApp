/**
 * Created by Jess on 05-Jul-16.
 */

app.run(['$rootScope', '$state', '$stateParams', 'Message', '$mdMedia',
    '$mdSidenav', 'amMoment', '$window', '$timeout',
    function($rootScope, $state, $stateParams, Message, $mdMedia,
             $mdSidenav, amMoment, $window, $timeout) {

        amMoment.changeLocale('es');

        $rootScope.preloader = false;
        $rootScope.userAuthenticated = false;
        $rootScope.userInfo = {};
        $rootScope.firebaseUser = {};
        $rootScope.appContainer = 'views-container';


        var userClass = new User();

        /*
         * Handle Auth Updates
         * */
        firebase.auth().onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser){
                $rootScope.userAuthenticated = true;
                $rootScope.firebaseUser = firebaseUser;
                userClass.getUserInfo($rootScope.firebaseUser.uid).then(function(userInfo){
                    $rootScope.userInfo = userInfo;
                });
                if($state.current.name == 'intro'){
                    $state.go("app.dashboard");
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
                $rootScope.fromState = fromState;
                $rootScope.toStateParams = toParams;
                $rootScope.fromStateParams = fromParams;

                //Hide Left Nav
                if(fromState.name){
                    if($mdSidenav("left").isOpen()){
                        $mdSidenav("left").close();
                    }
                }
            });

        $rootScope.$on("$stateChangeSuccess",
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.preloader = false;
                $rootScope.currentState = toState;
                /*var navToggle = $mdMedia('xs') || $mdMedia('sm') || $mdMedia('md');
                 if(navToggle){$mdSidenav.close('left')}*/

            });

        $rootScope.$on("$stateChangeError",
            function(event, toState, toParams, fromState, fromParams, error) {
                console.log('stateChangeError');
                console.log(error);
                if (error === "AUTH_REQUIRED") {
                    if($state.current.name != 'intro'){
                        $state.go("intro");
                    }
                    Message.toast({text: 'Debes iniciar sesion.', theme: 'toast-red'});
                    $rootScope.preloader = false;
                }else if(error === "NOT_AUTHORIZED"){
                    $state.go(fromState.name);
                    $rootScope.preloader = false;
                    Message.toast({text: 'No tienes acceso a ' + toState.name, theme: 'toast-red'});
                }
            });




        /*
         * Global Orion Tasks
         * */

        /*
         * Orion Tasks
         * */

        //Active Tasks
        var activeTaskClass = new ActiveTask();
        $rootScope.activeTasksAtomicArray =  activeTaskClass.db.atomicArray;
        $rootScope.activeTasksAtomicArray
            .$on({
                initialLotSize: 100000000
            })
            .then(function(instanceID){
                //
                document.addEventListener(instanceID + '_apply_filters', function () {
                    $timeout(function(){});
                }, false);
                $timeout(function(){});
            })
            .catch(function(err){
                console.log(err);
                Message.toast({text: 'Hubo un error construyendo el activeTasksAtomicArray.', theme: 'toast-red'});
            });

        //Completed Tasks
        var completedTaskClass = new CompletedTask();
        $rootScope.completedTasksAtomicArray =  completedTaskClass.db.atomicArray;
        $rootScope.completedTasksAtomicArray
            .$on({
                initialLotSize: 100000000
            })
            .then(function(instanceID){
                //
                document.addEventListener(instanceID + '_apply_filters', function () {
                    $timeout(function(){});
                }, false);
                $timeout(function(){});
            }).catch(function(err){
            console.log(err);
            Message.toast({text: 'Hubo un error construyendo el completedTasksAtomicArray.', theme: 'toast-red'});
        });

        //Rejected Tasks
        var rejectedTaskClass = new CompletedTask();
        $rootScope.rejectedTasksAtomicArray =  rejectedTaskClass.db.atomicArray;
        $rootScope.rejectedTasksAtomicArray
            .$on({
                initialLotSize: 100000000
            })
            .then(function(instanceID){
                //
                document.addEventListener(instanceID + '_apply_filters', function () {
                    $timeout(function(){});
                }, false);
                $timeout(function(){});
            })
            .catch(function(err){
                console.log(err);
                Message.toast({text: 'Hubo un error construyendo el rejectedTasksAtomicArray.', theme: 'toast-red'});
            });


        /*
         * Orion Host
         * */

        var orionHostClass = new OrionHost();
        $rootScope.orionHostObject = new AtomicObject(orionHostClass.db);

        $rootScope.orionHostObject
            .$on()
            .then(function(instanceID){
                document.addEventListener(instanceID + '_object_changed', function (data) {
                    $timeout(function(){});
                }, false);
            })
            .catch(function(err){
                console.log(err);
                Message.toast({text: 'Hubo un error construyendo el orionHostObject.', theme: 'toast-red'});
            });


        /*
         * Orion Activity
         * */

        var orionActivityClass = new OrionActivity();
        $rootScope.orionActivityObject = new AtomicObject(orionActivityClass.db);

        $rootScope.orionActivityObject
            .$on()
            .then(function(instanceID){
                document.addEventListener(instanceID + '_object_changed', function (newItem) {
                    $timeout(function(){});
                }, false);
            })
            .catch(function(err){
                console.log(err);
                Message.toast({text: 'Hubo un error construyendo el orionActivityObject.', theme: 'toast-red'});
            });


        /*
         * Setting up API Keys
         * */
        var apiKeysClass = new ApiKeys();
        $rootScope.apiKeysObject = new AtomicObject(apiKeysClass.db);
        $rootScope.apiKeysObject
            .$on()
            .then(function(instanceID){

                document.addEventListener(instanceID + '_object_changed', function (newItem) {
                    $timeout(function(){});
                }, false);

                /*
                 * Facebook API Initializer
                 * */

                $window.fbAsyncInit = function() {
                    // Executed when the SDK is loaded

                    FB.init({

                        /*
                         The app id of the web app;
                         To register a new app visit Facebook App Dashboard
                         ( https://developers.facebook.com/apps/ )
                         */
                        appId: $rootScope.apiKeysObject.item.facebookApi.appId,

                        /*
                         Adding a Channel File improves the performance
                         of the javascript SDK, by addressing issues
                         with cross-domain communication in certain browsers.


                         channelUrl: 'app/channel.html',*/

                        /*
                         Set if you want to check the authentication status
                         at the start up of the app
                         */

                        status: true,

                        /*
                         Enable cookies to allow the server to access
                         the session
                         */

                        cookie: true,

                        /* Parse XFBML */

                        xfbml: true,

                        /*
                         * Version
                         * */
                        version: 'v2687046'

                    });

                };
            })
            .catch(function(err){
                console.log(err);
                Message.toast({text: 'Hubo un error construyendo el apiKeysObject.', theme: 'toast-red'});
            });


        (function(d){
            // load the Facebook javascript SDK

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;

            js.src = "https://connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));



    }]);