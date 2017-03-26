/**
 * Created by Computadora on 07-Feb-17.
 */

'use strict';

var Article = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'articles/approved/all',
            secondary: function(article){
                var secondaryRefsArray = [];
                return new Promise(function(resolve, reject){

                    //Category Articles
                    secondaryRefsArray.push('articles/approved/categories/' + article.category.key + '/' + article.$key);

                    //Source Articles
                    secondaryRefsArray.push('articles/approved/sources/' + article.source.key + '/' + article.category.key + '/' + article.$key);

                    resolve(secondaryRefsArray);
                });
            },
            foreign: function(article){
                var foreignRefsArray = [];
                return new Promise(function(resolve, reject){

                    //Outstanding Articles
                    foreignRefsArray.push('articles/approved/outstanding/' + article.$key);

                    resolve(foreignRefsArray);
                });
            }
        },


        /*
         * Schema Related
         * */

        schema: {
            primary: {
                url: {
                    value: '='
                },
                title: {
                    value: '='
                },
                description: {
                    value: '='
                },
                image: {
                    value: '='
                },
                content: {
                    value: '='
                },
                outstanding: {
                    value: '=',
                    default: false
                },
                notificationPushed: {
                    value: '=',
                    default: false
                },
                category: {
                    value: '='
                },
                source: {
                    value: '='
                },
                primaryHashtag: {
                    value: '=',
                    default: null
                },
                secondaryHashtags: {
                    value: '=',
                    default: null
                },
                leaders: {
                    value: '=',
                    default: null
                },
                views: {
                    value: '=',
                    default: 0
                },
                subscriptions: {
                    value: '=',
                    default: 0
                }
            },


            secondary: {
                url: {
                    value: '='
                },
                title: {
                    value: '='
                },
                description: {
                    value: '='
                },
                image: {
                    value: '='
                },
                content: {
                    value: '='
                },
                outstanding: {
                    value: '=',
                    default: false
                },
                notificationPushed: {
                    value: '=',
                    default: false
                },
                category: {
                    value: '='
                },
                source: {
                    value: '='
                },
                primaryHashtag: {
                    value: '=',
                    default: null
                },
                secondaryHashtags: {
                    value: '=',
                    default: null
                },
                leaders: {
                    value: '=',
                    default: null
                },
                views: {
                    value: '=',
                    default: 0
                },
                subscriptions: {
                    value: '=',
                    default: 0
                }
            },


            foreign: {
                url: {
                    value: '='
                },
                title: {
                    value: '='
                },
                description: {
                    value: '='
                },
                image: {
                    value: '='
                },
                content: {
                    value: '='
                },
                outstanding: {
                    value: '=',
                    default: false
                },
                notificationPushed: {
                    value: '=',
                    default: false
                },
                category: {
                    value: '='
                },
                source: {
                    value: '='
                },
                primaryHashtag: {
                    value: '=',
                    default: null
                },
                secondaryHashtags: {
                    value: '=',
                    default: null
                },
                leaders: {
                    value: '=',
                    default: null
                },
                views: {
                    value: '=',
                    default: 0
                },
                subscriptions: {
                    value: '=',
                    default: 0
                }
            },


            priority: {
                order: function(article){
                    return -(article.creationTS);
                }
            }
        }
    });
};



Article.prototype.toggleOutstanding = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        item.outstanding = !item.outstanding;
        self.db.query.update(item)
            .then(function(){
                if(!item.outstanding)self.removeOutstandingArticle(item);
                resolve(true);
            })
            .catch(function(err){
                reject(err);
            });
    });
};


Article.prototype.removeOutstandingArticle = function(item){
    var self = this;
    return new Promise(function(resolve, reject){
        var ref = self.db.ref.root.child('articles/approved/outstanding/' + item.$key);
        ref.remove()
            .then(function(){
                resolve(true);
            })
            .catch(function(err){
                reject(err);
            });
    });
};