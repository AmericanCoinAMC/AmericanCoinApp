/**
 * Created by Computadora on 14-Jan-17.
 */
app.directive('sourceAssignments',
    ['$timeout', 'Message', function($timeout, Message){
            return {
                restrict: 'E',
                scope: {
                    source: '='
                },
                templateUrl: '/core/components/app/sources/configuration/assignments/assignments.html',
                link: function(scope, element, attrs) {
                    var sourceAssignmentClass = new SourceAssignment(scope.source);


                    scope.atomicArray = sourceAssignmentClass.db.atomicArray;

                    scope.atomicArray
                        .$on({
                        initialLotSize: 1000
                        })
                        .then(function(instanceID){
                            document.addEventListener(scope.atomicArray.id + '_apply_filters', function () {
                                $timeout(function(){});
                            }, false);
                            $timeout(function(){});
                        });



                    var userClass = new User();
                    scope.userAtomicArray =  userClass.db.atomicArray;

                    scope.userAtomicArray
                        .$on({
                            initialLotSize: 1000
                        })
                        .then(function(instanceID){
                            document.addEventListener(scope.userAtomicArray.id + '_apply_filters', function () {
                                $timeout(function(){});
                            }, false);
                        });


                    scope.assigning = false;
                    scope.searchQuery = '';

                    scope.assign = function(user){
                        sourceAssignmentClass.assign(user)
                            .then(function(){
                                scope.cancel();
                            })
                            .catch(function(err){
                                console.log(err);
                                Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                                scope.cancel();
                            });
                    };

                    scope.unassign = function(user){
                        sourceAssignmentClass.unassign(user)
                            .then(function(){
                                scope.cancel();
                            })
                            .catch(function(err){
                                console.log(err);
                                Message.toast({text: 'Hubo un error.', theme: 'toast-red'});
                                scope.cancel();
                            });
                    };

                    scope.assignMode = function(){
                        scope.assigning = true;
                    };



                    scope.search = function(query){
                        return query ? scope.userAtomicArray.items.filter(scope.createFilterFor(query)) : scope.userAtomicArray.items;
                    };

                    scope.createFilterFor = function(query){
                        var lowercaseQuery = angular.lowercase(query);
                        return function filterFn(user) {
                            var result = query.indexOf(user.name) === 0;
                            console.log(result);
                            return result;
                        };
                    };

                    scope.cancel = function(){
                        scope.selectedUser = '';
                        scope.searchQuery = '';
                        scope.assigning = false;
                    };

                    /*
                     * Watchers
                     * */

                    scope.$watch('source', function(newValue, oldValue) {
                        if(newValue != undefined){
                            scope.source = newValue;
                        }
                    }, true);

                }
            }
        }]);