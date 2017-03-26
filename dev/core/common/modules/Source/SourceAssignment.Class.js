/**
 * Created by Computadora on 11-Jan-17.
 */

/**
 * Created by Computadora on 05-Jan-17.
 */
'use strict';

var SourceAssignment = function(source){
    var self = this;
    self.source = source;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'sources/assignments/' + self.source.$key || self.source.key
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                name: {
                    value: '='
                }
            }
        }
    });
};


SourceAssignment.prototype.assign = function(user){
    var self = this;
    return new Promise(function(resolve, reject){
        var userRef = self.db.ref.root.child(self.db.ref.primary + '/' + user.$key || user.key);
            userRef
            .set({
                name: user.name,
                latestServerTS: firebase.database.ServerValue.TIMESTAMP
            })
            .then(function(){
                resolve(true);
            })
            .catch(function(err){reject(err)});
    });
};

SourceAssignment.prototype.unassign = function(user){
    var self = this;
    return new Promise(function(resolve, reject){
        var userRef = self.db.ref.root.child(self.db.ref.primary + '/' + user.$key || user.key);
        userRef
            .update({
                latestServerTS: firebase.database.ServerValue.TIMESTAMP
            })
            .then(function(){
                userRef
                    .remove()
                    .then(function(){
                        resolve(true);
                    })
                    .catch(function(err){reject(err)});
            })
            .catch(function(err){reject(err)});
    });
};

SourceAssignment.prototype.isAssigned = function(user){
    var self = this;
    return new Promise(function(resolve, reject){
        var userRef = self.db.ref.root.child(self.db.ref.primary + user.$key || user.key);
        userRef.once("value")
            .then(function(snapshot){
                resolve(snapshot.exists());
            })
            .catch(function(err){reject(err)});
    });
};