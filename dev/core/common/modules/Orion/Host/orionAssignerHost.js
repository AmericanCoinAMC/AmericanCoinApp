/**
 * Created by Computadora on 08-Feb-17.
 */
app.directive('orionAssignerHost',
    ['OrionAssignerController', '$rootScope', '$q', '$timeout', 'Message', '$interval',
        function(OrionAssignerController, $rootScope, $q, $timeout, Message, $interval){
            return {
                restrict: 'E',
                templateUrl: '/core/common/modules/Orion/Host/orionAssignerHost.html',
                link: function(scope, element, attrs) {
                    var orionHostClass = new OrionHost();



                    var assignerStatusInterval;


                    $timeout(function(){
                        assignerStatusInterval =
                            $interval(
                                scope.isAssignerRunning, //function
                                10000, //$interval period in MS
                                0,
                                false
                            );
                    }, 2000);


                    scope.becomeAssignerHost = function(){
                        var deferred = $q.defer();

                        OrionAssignerController.on().then(function(){
                            $rootScope.orionHostObject.item.assigner.status = true;
                            $rootScope.orionHostObject.item.assigner.user = {
                                key: $rootScope.userInfo.$key,
                                name: $rootScope.userInfo.name
                            };
                            scope.updateAssignerHostObject()
                                .then(function(){
                                    Message.toast({text: 'You are Hosting The Orion Assigner.', theme: 'toast-info'});
                                })
                                .catch(function(err){
                                    deferred.reject(err);
                                    console.log(err);
                                    Message.toast({text: 'Hubo un error en becomeHost.', theme: 'toast-red'});
                                });
                        }).catch(function(err){console.log(err)});
                        return deferred.promise;
                    };



                    scope.updateAssignerHostObject = function(){
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



                    scope.isAssignerRunning = function(){

                        // 1 minutes
                        var activeWindow = 60000;

                        var serverClass = new Server(orionHostClass.db.ref.root);

                        serverClass.getLatestTS()
                            .then(function(ts){

                                var lastActivityDate =
                                    new Date($rootScope.orionActivityObject.item.assigner);

                                var serverLatestDate =
                                    new Date(ts);

                                if((serverLatestDate - lastActivityDate) <= activeWindow){

                                    return true;
                                }else{
                                    $rootScope.orionHostObject.item.assigner.status = false;
                                    $rootScope.orionHostObject.item.assigner.user = null;

                                    scope.updateAssignerHostObject();
                                    OrionAssignerController.off();
                                    return false;
                                }
                            })
                            .catch(function(err){console.log(err)});


                    };



                }
            }
        }]);