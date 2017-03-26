/**
 * Created by Computadora on 04-Feb-17.
 */
/**
 * Created by Computadora on 11-Jan-17.
 */


'use strict';

var RejectedTask = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'orion/tasks/rejected'
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                articleUrl: {
                    value: '='
                },
                categoryUrl: {
                    value: '='
                },
                sourceKey: {
                    value: '='
                },
                categoryKey: {
                    value: '='
                },
                reason: {
                    value: function(rejectedTask){
                        if(rejectedTask != undefined && rejectedTask.reason != undefined && rejectedTask.reason != null){
                            if(typeof rejectedTask.reason == 'object'){
                                return JSON.stringify(rejectedTask.reason);
                            }else{
                                return rejectedTask.reason;
                            }
                        }else{
                            return "NO_REASON_PROVIDED";
                        }
                    }
                }
            }
        }
    });
};

RejectedTask.prototype.urlExists = function(url){
    var self = this;
    var taskRef = self.db.ref.root
        .child(self.db.ref.primary)
        .orderByChild('articleUrl')
        .equalTo(url);

    return new Promise(function(resolve, reject){
        taskRef.once("value")
            .then(function(snapshot){
                resolve(snapshot.exists());
            })
            .catch(function(err){reject(err)});
    });
};