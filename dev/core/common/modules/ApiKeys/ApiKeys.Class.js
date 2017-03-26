/**
 * Created by Computadora on 11-Jan-17.
 */

/**
 * Created by Computadora on 05-Jan-17.
 */
'use strict';

var ApiKeys = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'security/apiKeys'
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                facebookApi: {
                    value: '='
                },
                ogioApi: {
                    value: '='
                },
                categoryUrlsExtractor: {
                    value: '='
                },
                articleExtractor: {
                    value: '='
                }
            }
        }
    });
};

