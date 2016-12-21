/**
 * Created by Computadora on 20-Dec-16.
 */
app.factory('UserService',[
    'Auth', '$state', '$q', '$rootScope',
    function(Auth, $state, $q, $rootScope){
    return{
        getAuthInfo: function(){
            return Auth.$getAuth();
        },

        getUserInfo: function(userId){
            var deferred = $q.defer();
            rootRef.child('users/'+userId).once("value").then(function(snapshot){
                var userObject = snapshot.val();
                userObject.$id = snapshot.key;
                deferred.resolve(userObject);
            });
            return deferred.promise;
        },

        signOut: function(){
            Auth.$signOut();
            $rootScope.firebaseUser = {};
            $rootScope.userInfo = {};
        }
    }
}]);