/**
 * Created by Computadora on 11-Jan-17.
 */

'use strict';

var SourceCategoryUrl = function(source, category){
    var self = this;
    self.source = source;
    self.category = category;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'sources/categories/' + self.source.$key + '/' + self.category.$key
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                url: {
                    value: '='
                }
            }
        }
    });
};

/*
* CRD
* */

SourceCategoryUrl.prototype.create = function(item){
    var self = this;

    return new Promise(function(resolve, reject){
        self.db.query
            .create(item)
            .then(function(snapshotKey){
                resolve(snapshotKey);
            })
            .catch(function(err){reject(err)});
    });
};

SourceCategoryUrl.prototype.remove = function(item){
    var self = this;

    return new Promise(function(resolve, reject){
        self.db.query
            .remove(item)
            .then(function(){
                resolve(true);
            })
            .catch(function(err){reject(err)});
    });
};