/**
 * Created by Computadora on 20-Dec-16.
 */
/**
 * Created by Computadora on 10-Dec-16
 */

app.factory('Server',
    ['$timeout', '$q', '$rootScope',
        function($timeout, $q, $rootScope){

            var ref = rootRef.child('server');

            return {

                updateTimestamp: function(){
                    var deferred = $q.defer();
                    ref.set({
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).then(function(){
                        deferred.resolve(true);
                    }).catch(function(err){deferred.reject(err);});
                    return deferred.promise
                },

                getTimestamp: function(){
                    var deferred = $q.defer();
                    ref.once("value").then(function(snapshot){
                        deferred.resolve(snapshot.val().timestamp);
                    }).catch(function(err){deferred.reject(err);});
                    return deferred.promise
                }


            }
        }]);