/**
 * Created by Computadora on 11-Jan-17.
 */

/**
 * Created by Computadora on 05-Jan-17.
 */
'use strict';

var SourceCategory = function(source){
    var self = this;
    self.source = source;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'sources/categories/' + self.source.$key || self.source.key
        }


    });
};