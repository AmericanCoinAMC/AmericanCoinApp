/**
 * Created by Computadora on 20-Dec-16.
 */
app.factory('UserService',[
    'Auth', '$state', '$q', '$rootScope',
    function(Auth, $state, $q, $rootScope){
    return{
        /*
        * Authentication
        * */

        signIn: function(user){
            var deferred = $q.defer();
            switch(user.provider) {
                case "email":
                    this.signInWithEmail(user).then(function(){
                        deferred.resolve(true);
                    }).catch((function(err){deferred.reject(err)}));
                    break;

                default:
                    break;
            }
            return deferred.promise;
        },

        signInWithEmail: function(user){
            var deferred = $q.defer();
            Auth.$signInWithEmailAndPassword(user.email, user.password)
                .then(function(){
                    deferred.resolve(true);
                }).catch((function(err){deferred.reject(err)}));
            return deferred.promise;
        },


        /*
        * Registration
        * */
        createAccount: function(user){
            var deferred = $q.defer();
            this.buildUserObject(user).then(angular.bind(this, function(processedUser){
                switch(processedUser.provider) {
                    case "email":
                        this.createEmailUser(processedUser).then(function(userSnapshot){
                            deferred.resolve(userSnapshot);
                        }).catch(function(err) {deferred.reject(err)});
                        break;
                    default:
                        break;
                }
            })).catch(function(err) {deferred.reject(err)});
            return deferred.promise;
        },

        createEmailUser: function(user){
            var deferred = $q.defer();
            Auth.$createUserWithEmailAndPassword(user.email, user.password)
                .then(angular.bind(this, function(firebaseUser) {
                    this.createUser(firebaseUser.uid, user).then(function(){
                        deferred.resolve(firebaseUser);
                    }).catch(function(err) {deferred.reject(err)});
                })).catch(function(err) {deferred.reject(err)});
            return deferred.promise;
        },

        createUser: function(userKey, user){
            var deferred = $q.defer();
            user.password = null;
            var ref = rootRef.child('users/' + userKey);
            ref.set(user).then(function(){
                deferred.resolve(true);
            }).catch(function(err) {deferred.reject(err)});
            return deferred.promise;
        },

        /*
        * Populator
        * */

        buildUserObject: function(user){
            var deferred = $q.defer();
            var currentStamp = new Date().getTime();
            user.eventDate = currentStamp;
            user['.priority'] = -(currentStamp);
            user.authority = 0;
            user.preferences = {
                theme: 'default',
                card: 'expand'
            };
            user.isAdmin = false;
            user.birthday = user.birthday.split("/");
            var newDate = user.birthday[1] + "/" + user.birthday[0] + "/" + user.birthday[2];
            user.birthday = new Date(newDate).getTime();
            UserInfo.getInfo(function(data) {
                user.location = {
                    continent: {
                        name: data.continent.name,
                        short: data.continent.code
                    },
                    country: {
                        name: data.country.name,
                        short: data.country.code
                    },
                    city: {
                        name: data.city.name
                    }
                };
                deferred.resolve(user);
            }, function(err) {deferred.reject(err);});
            return deferred.promise;
        },

        /*
        * Getters
        * */
        getAuthInfo: function(){
            return Auth.$getAuth();
        },

        getUserInfo: function(userId){
            var deferred = $q.defer();
            rootRef.child('users/'+userId).once("value").then(function(snapshot){
                var userObject = snapshot.val();
                userObject.$id = snapshot.key;
                deferred.resolve(userObject);
            }).catch(function(err){deferred.reject(err)});
            return deferred.promise;
        },

        /*
        * Validators
        * */
        emailExists: function(email){
            var deferred = $q.defer();
            var ref = rootRef.child('users').orderByChild('email').equalTo(email);
            ref.once("value").then(function(snapshot){
                deferred.resolve(snapshot.exists());
            }).catch(function(err){deferred.reject(err)});
            return deferred.promise;
        },

        /*
        * Helpers
        * */
        signOut: function(){
            Auth.$signOut();
            $rootScope.firebaseUser = {};
            $rootScope.userInfo = {};
        }
    }
}]);