/**
 * Created by Computadora on 11-Jan-17.
 */

/**
 * Created by Computadora on 05-Jan-17.
 */
'use strict';

var Section = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'security/sections'
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                name: {
                    value: '='
                },
                authority: {
                    value: '=',
                    default: 0
                }
            },

            priority: {
                order: function(properties){
                    return -(properties.authority);
                }
            }
        },

        filters: {

        }
    });
};

Section.prototype.nameAvailable = function(name){
  var self = this;
  return new Promise(function(resolve, reject){
      self.db.ref.root.child(self.db.ref.primary + '/name/' + name)
          .once("value")
          .then(function(snapshot){
              resolve(!snapshot.exists());
          })
          .catch(function(err){reject(err)});
  });
};


Section.prototype.isAuthorized = function(user, sectionName){
    var self = this;
    return new Promise(function(resolve, reject){
        self.getSectionAuthority(sectionName).then(function(sectionAuthority){
            if(user.authority >= sectionAuthority){
                resolve(true);
            }else{
                resolve(false);
            }
        }).catch(function(err){reject(err)});
    });
};


Section.prototype.getSectionAuthority = function(sectionName){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.ref.root.child(self.db.ref.primary)
            .orderByChild('name')
            .equalTo(sectionName)
            .once("value")
            .then(function(snapshot){
                if(snapshot.exists()){
                    resolve(snapshot.val().authority);
                }else{
                    reject("Section Doesn't Exist");
                }
            })
            .catch(function(err){reject(err)});
    });
};