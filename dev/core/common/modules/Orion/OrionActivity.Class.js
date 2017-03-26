/**
 * Created by Computadora on 04-Feb-17.
 */

'use strict';

var OrionActivity = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'orion/activity'
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                assigner: {
                    value: '='
                },
                executioner: {
                    value: '='
                }
            }
        }
    });
};


OrionActivity.prototype.log = function(type){
    var self = this;

    var activityRef = self.db.ref.root.child(self.db.ref.primary);
    return new Promise(function(resolve, reject){

        var logObj = {};
        if(type == 'assigner'){
            logObj.assigner = firebase.database.ServerValue.TIMESTAMP;
        }else{
            logObj.executioner = firebase.database.ServerValue.TIMESTAMP;
        }

        logObj.latestServerTS = firebase.database.ServerValue.TIMESTAMP;

        activityRef.update(logObj)
            .then(function(){
                resolve(true);
            })
            .catch(function(err){reject(err)})
    });
};