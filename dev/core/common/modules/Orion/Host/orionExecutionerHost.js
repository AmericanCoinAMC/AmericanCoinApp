/**
 * Created by Computadora on 08-Feb-17.
 */
app.directive('orionExecutionerHost',
    ['OrionExecutionerController', '$rootScope', '$q', '$timeout', 'Message', '$interval',
        function(OrionExecutionerController, $rootScope, $q, $timeout, Message, $interval){
            return {
                restrict: 'E',
                templateUrl: '/core/common/modules/Orion/Host/orionExecutionerHost.html',
                link: function(scope, element, attrs) {
                    var orionHostClass = new OrionHost();



                    var executionerStatusInterval;


                    $timeout(function(){
                        executionerStatusInterval =
                            $interval(
                                scope.isExecutionerRunning, //function
                                10000, //$interval period in MS
                                0,
                                false
                            );
                    }, 2000);


                    scope.becomeExecutionerHost = function(){
                        var deferred = $q.defer();

                        OrionExecutionerController.on().then(function(){
                            $rootScope.orionHostObject.item.executioner.status = true;
                            $rootScope.orionHostObject.item.executioner.user = {
                                key: $rootScope.userInfo.$key,
                                name: $rootScope.userInfo.name
                            };
                            scope.updateExecutionerHostObject()
                                .then(function(){
                                    Message.toast({text: 'You are Hosting The Orion Executioner.', theme: 'toast-info'});
                                })
                                .catch(function(err){
                                    deferred.reject(err);
                                    console.log(err);
                                    Message.toast({text: 'Hubo un error en becomeHost.', theme: 'toast-red'});
                                });
                        }).catch(function(err){console.log(err)});
                        return deferred.promise;
                    };



                    scope.updateExecutionerHostObject = function(){
                        var deferred = $q.defer();
                        var hostRef = orionHostClass.db.ref.root.child('orion/host');

                        var hostObj = {
                            assigner: $rootScope.orionHostObject.item.assigner,
                            executioner: $rootScope.orionHostObject.item.executioner,
                            latestServerTS: firebase.database.ServerValue.TIMESTAMP
                        };

                        hostRef
                            .update(hostObj)
                            .then(function(){
                                deferred.resolve(true)
                            })
                            .catch(function(err){
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };



                    scope.isExecutionerRunning = function(){

                        // 1 minutes
                        var activeWindow = 60000;

                        var serverClass = new Server(orionHostClass.db.ref.root);

                        serverClass.getLatestTS()
                            .then(function(ts){

                                var lastActivityDate =
                                    new Date($rootScope.orionActivityObject.item.executioner);

                                var serverLatestDate =
                                    new Date(ts);

                                if((serverLatestDate - lastActivityDate) <= activeWindow){

                                    return true;
                                }else{
                                    $rootScope.orionHostObject.item.executioner.status = false;
                                    $rootScope.orionHostObject.item.executioner.user = null;

                                    scope.updateExecutionerHostObject();
                                    OrionExecutionerController.off();
                                    return false;
                                }
                            })
                            .catch(function(err){console.log(err)});


                    };



                }
            }
        }]);