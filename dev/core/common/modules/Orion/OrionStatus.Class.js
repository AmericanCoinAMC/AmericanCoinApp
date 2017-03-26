/**
 * Created by Computadora on 04-Feb-17.
 */

'use strict';

var OrionStatus = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'orion/status'
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

