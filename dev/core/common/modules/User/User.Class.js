/**
 * Created by Computadora on 11-Jan-17.
 */

/**
 * Created by Computadora on 05-Jan-17.
 */
'use strict';

var User = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'users',
            /*foreign: function(user){
             var groupClass = new Group();
             return new Promise(function(resolve, reject){
             var refArray = [];
             if(user.groups){
             for (var key in user.groups) {
             if (!user.groups.hasOwnProperty(key)) continue;
             refArray.push(groupClass.db.ref.primary + '/' + key + '/users/' + user.$key || user.key);
             }
             }
             resolve(refArray);
             });
             }*/
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                name: {
                    value: '='
                },
                email: {
                    value: '='
                },
                birthday: {
                    value: '='
                },
                gender: {
                    value: '='
                },
                preferences: {
                    value: '='
                },
                location: {
                    value: '='
                },
                authority: {
                    value: '=',
                    default: 0
                },
                isAdmin: {
                    value: '=',
                    default: false
                }
            },

            foreign: {
                name: {
                    value: '='
                }
            },

            priority: {
                order: 'dateDesc'
            }
        }
    });
};


User.prototype.isAdmin = function(userKey){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.ref.root.child(self.db.ref.primary + '/' + userKey + '/isAdmin')
            .once("value")
            .then(function(snapshot){
                resolve(snapshot.val());
            })
            .catch(function(err){reject(err)})
    });
};



User.prototype.getAuthInfo = function(){
    return firebase.auth().currentUser;
};

User.prototype.getUserInfo = function(userKey){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.ref.root
            .child(self.db.ref.primary + '/' + userKey)
            .once("value")
            .then(function(snapshot){
                if(snapshot.exists()){
                    resolve(self.db.schema.build(snapshot, 'snapshot'));
                }else{
                    resolve(null);
                }
            })
            .catch(function(err){reject(err)})
    });
};


/*
* Authentication Related
* */

User.prototype.signIn = function(user){
    var self = this;
    return new Promise(function(resolve, reject){
        switch(user.provider) {
            case "email":
                self.signInWithEmail(user)
                    .then(function(){
                        resolve(true);
                    })
                    .catch((function(err){reject(err)}));
                break;
            default:
                break;
        }
    });
};

User.prototype.signOut = function(){
    firebase.auth().signOut();
};

User.prototype.signInWithEmail = function(user){
    var self = this;
    return new Promise(function(resolve, reject){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function(firebaseUser){
                resolve(firebaseUser);
            })
            .catch(function(err){reject(err)})
    });
};



/*
 * Validations
 * */

User.prototype.emailExists = function(email){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.ref.root
            .child(self.db.ref.primary)
            .orderByChild('email')
            .equalTo(email)
            .once("value")
            .then(function(snapshot){
                resolve(snapshot.exists());
            })
            .catch(function(err){reject(err)})
    });
};

