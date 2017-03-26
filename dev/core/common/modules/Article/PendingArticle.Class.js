/**
 * Created by Computadora on 07-Feb-17.
 */

'use strict';

var PendingArticle = function(){
    var self = this;
    self.db = new Database({

        /*
         * Refs Related
         * */

        refs: {
            primary: 'articles/pending/all',
            secondary: function(article){
                var secondaryRefsArray = [];
                return new Promise(function(resolve, reject){

                    //Retrieve User Assignments Refs | article/pending/users/$userKey
                    var userAssignmentRefs = self.db.ref.root.child('sources/assignments/' + article.source.key);
                    userAssignmentRefs.once("value")
                        .then(function(sourceAssignmentsSnapshot){
                            sourceAssignmentsSnapshot.forEach(function(userSnapshot){
                                secondaryRefsArray.push('articles/pending/users/' + userSnapshot.key + '/' + article.$key);
                            });

                            resolve(secondaryRefsArray);
                        })
                        .catch(function(err){
                            console.log(err);
                            reject(err);
                        });

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

