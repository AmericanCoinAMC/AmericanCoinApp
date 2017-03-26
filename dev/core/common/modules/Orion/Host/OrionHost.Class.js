/**
 * Created by Computadora on 04-Feb-17.
 */

'use strict';

var OrionHost = function(){
    var self = this;


    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'orion/host'
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

