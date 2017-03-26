/**
 * Created by Computadora on 04-Feb-17.
 */
/**
 * Created by Computadora on 11-Jan-17.
 */


'use strict';

var CompletedTask = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'orion/tasks/completed'
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
                }
            }
        }
    });
};

CompletedTask.prototype.urlExists = function(url){
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