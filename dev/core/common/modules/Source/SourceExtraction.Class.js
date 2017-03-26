/**
 * Created by Computadora on 11-Jan-17.
 */

/**
 * Created by Computadora on 05-Jan-17.
 */
'use strict';

var SourceExtraction = function(source){
    var self = this;
    self.source = source;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'sources/extraction/' + self.source.$key || self.source.key
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                openGraph: {
                    value: '='
                },
                article: {
                    value: '='
                },
                categoryUrls: {
                    value: '='
                }
            }
        }
    });
};


SourceExtraction.prototype.save = function(item){
    var self = this;

    return new Promise(function(resolve, reject){
        var ref = self.db.ref.root.child(self.db.ref.primary);
        ref.set(self.db.schema.build(item, 'primary'))
            .then(function(){
                resolve(true);
            })
            .catch(function(err){reject(err)});
    });
};