/**
 * Created by Computadora on 06-Feb-17.
 */

'use strict';

var OrionSpeed = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'orion/speed'
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

