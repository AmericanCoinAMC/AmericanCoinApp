/**
 * Created by Computadora on 11-Jan-17.
 */

/**
 * Created by Computadora on 05-Jan-17.
 */
'use strict';

var Source = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'sources/information',
            primaryStorage: 'sources'
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                name: {
                    value: '='
                },
                description: {
                    value: '='
                },
                fileUrl: {
                    value: '='
                },
                fileName: {
                    value: '='
                },
                status: {
                    value: '='
                },
                profile: {
                    value: '='
                },
                articleConfig: {
                    value: '='
                }
            },

            secondary: {
                name: {
                    value: '='
                }
            },

            foreign: {
                name: {
                    value: '='
                },
                description: {
                    value: '='
                },
                fileUrl: {
                    value: '='
                },
                status: {
                    value: '='
                },
                profile: {
                    value: '='
                },
                articleConfig: {
                    value: '='
                }
            },

            priority: {
                order: 'custom',
                childAdded: 'last'
            }
        }
    });
};


/*
* CRUD
* */

Source.prototype.create = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.atomicFile.upload(item.file)
            .then(function(fileDetails){
                item.fileName = fileDetails.fileName;
                item.fileUrl = fileDetails.fileUrl;
                self.db.atomicPriority.getPriority(item)
                    .then(function(priority){
                        item.$priority = priority;
                        self.db.query.create(item)
                            .then(function(snapshotKey){resolve(snapshotKey)})
                            .catch(function(err){reject(err)})
                    })
                    .catch(function(err){reject(err)});
            })
            .catch(function(err){reject(err)})
    });
};


Source.prototype.alter = function(item){
    var self = this;

    return new Promise(function(resolve, reject){
        if(item.updateFile){
            self.updateWithFile(item)
                .then(function(){resolve(true)})
                .catch(function(err){reject(err)})
        }else{
            self.update(item)
                .then(function(){resolve(true)})
                .catch(function(err){reject(err)})
        }
    });
};

Source.prototype.update = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.query.update(item)
            .then(function(){
                resolve(true)
            })
            .catch(function(err){reject(err)})
    });
};

Source.prototype.updateWithFile = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.atomicFile.upload(item.file)
            .then(function(fileDetails){

                self.db.atomicFile
                    .delete(item.fileName)
                    .then(function(){
                        item.fileName = fileDetails.fileName;
                        item.fileUrl = fileDetails.fileUrl;
                        self.update(item)
                            .then(function(){
                                resolve(true)
                            })
                            .catch(function(err){
                                self.db.atomicFile
                                    .delete(fileName)
                                    .then(function(){
                                        reject(err)
                                    }).catch(function(err){reject(err)});
                            })
                    })
                    .catch(function(err){
                        self.db.atomicFile
                            .delete(item.fileName)
                            .then(function(){
                                reject(err)
                            }).catch(function(err){reject(err)});
                    });
            })
            .catch(function(err){reject(err)})
    });
};

Source.prototype.remove = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.atomicFile
            .delete(item.fileName)
            .then(function(){
                self.db.query.remove(item)
                    .then(function(){resolve(true)})
                    .catch(function(err){reject(err)});
            }).catch(function(err){reject(err)});
    });
};



/*
* Order
* */

Source.prototype.moveToFirst = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.atomicPriority
            .first()
            .then(function(priority){
                item.$priority = priority;
                self.update(item)
                    .then(function(){resolve(true)})
                    .catch(function(err){reject(err)})
            })
            .catch(function(err){reject(err)})
    });
};

Source.prototype.moveToLast = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.atomicPriority
            .last()
            .then(function(priority){
                item.$priority = priority;
                self.update(item)
                    .then(function(){resolve(true)})
                    .catch(function(err){reject(err)})
            })
            .catch(function(err){reject(err)})
    });
};


Source.prototype.moveBefore = function(item, previousToItem){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.atomicPriority
            .previous(previousToItem)
            .then(function(priority){
                item.$priority = priority;
                self.update(item)
                    .then(function(){resolve(true)})
                    .catch(function(err){reject(err)})
            })
            .catch(function(err){reject(err)})
    });
};

Source.prototype.moveNext = function(item, nextToItem){
    var self = this;
    return new Promise(function(resolve, reject){
        self.db.atomicPriority
            .next(nextToItem)
            .then(function(priority){
                item.$priority = priority;
                self.update(item)
                    .then(function(){resolve(true)})
                    .catch(function(err){reject(err)})
            })
            .catch(function(err){reject(err)})
    });
};
