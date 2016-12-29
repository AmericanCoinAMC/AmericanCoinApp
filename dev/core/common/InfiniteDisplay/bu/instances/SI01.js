/**
 * Created by Computadora on 10-Dec-16 
 */

app.factory('SI01',
    ['$timeout', '$q', '$rootScope', 'Server',
        function($timeout, $q, $rootScope, Server){

            var firstLotSize, nextLotSize;
            var displayedItems = 0;

            var subscribed = false;

            var firstLotLoaded = false;
            var itemsRemaining = true;

            var fetching = false;
            var itemsArray = [];


            var ref, eventListenerRef, objectBuilder;

            return {
                initialize: function(config){
                    var deferred = $q.defer();
                    this.deactivate();
                    firstLotSize = config.firstLotSize;
                    nextLotSize = config.nextLotSize;
                    ref = config.ref;
                    objectBuilder = config.objectBuilder;
                    Server.updateTimestamp().then(angular.bind(this, function(){
                        this.loadFirstLot().then(angular.bind(this, function(){
                            firstLotLoaded = true;
                            deferred.resolve(true);
                        })).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                    return deferred.promise;
                },

                loadFirstLot: function(){
                    var deferred = $q.defer();
                    var firstLotRef = ref.limitToFirst(firstLotSize);
                    firstLotRef.once('value').then(angular.bind(this, function(snapshot){
                        snapshot.forEach(angular.bind(this, function(childSnapshot) {
                            this.addItem(childSnapshot);
                        }));
                        Server.getTimestamp().then(angular.bind(this, function(timestamp){
                            eventListenerRef = ref.orderByChild('timestamp').startAt(timestamp);
                            this.subscribe();
                            firstLotLoaded = true;
                            deferred.resolve(true);
                        })).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});

                    return deferred.promise;
                },

                loadNextLot: function(){
                    var deferred = $q.defer();
                    if(!fetching && itemsArray[parseInt(displayedItems - 1)] != undefined){
                        fetching = true;
                        var previousArrayLength = itemsArray.length;
                        var nextLotRef =
                            ref.startAt(itemsArray[parseInt(displayedItems - 1)].$priority + 1)
                                .limitToFirst(nextLotSize);
                        nextLotRef.once('value').then(angular.bind(this, function(snapshot){
                            snapshot.forEach(angular.bind(this, function(childSnapshot) {
                                this.addItem(childSnapshot);
                            }));
                            if(previousArrayLength == itemsArray.length){itemsRemaining = false;}
                            $timeout(function(){
                                fetching = false;
                                deferred.resolve(true);
                            }, 4000);
                        })).catch(function(err){
                            deferred.reject(err);
                        });
                    }else{
                        deferred.resolve(false);
                    }
                    return deferred.promise;
                },


                /*
                * Event Listeners Subscriber
                * */

                subscribe: function(){
                    subscribed = true;
                    eventListenerRef.on('child_added', angular.bind(this, function(snapshot) {
                        if(firstLotLoaded){
                            console.log('child_added');
                            this.addItem(snapshot, true);
                            $timeout(angular.bind(this, function () {this.sortArray();}));
                        }
                    }));

                    eventListenerRef.on('child_changed', angular.bind(this, function(snapshot) {
                        if(firstLotLoaded){
                            console.log('child_changed');
                            this.editItem(snapshot);
                            $timeout(angular.bind(this, function () {this.sortArray();}));
                        }
                    }));

                    eventListenerRef.on('child_moved', angular.bind(this, function(snapshot) {
                        if(firstLotLoaded){
                            console.log('child_moved');
                            this.editItem(snapshot);
                            $timeout(angular.bind(this, function () {this.sortArray();}));
                        }
                    }));

                    eventListenerRef.on('child_removed', angular.bind(this, function(snapshot) {
                        if(firstLotLoaded) {
                            console.log('child_removed');
                            this.removeItem(snapshot);
                            $timeout(angular.bind(this, function () {this.sortArray();}));
                        }
                    }));
                    console.log('Event Listeners On');
                },

                /*
                * Deactivators
                * */

                deactivate: function(){
                    this.unsubscribe();
                    this.resetDefaults();
                },

                unsubscribe: function(){
                    if(subscribed){
                        eventListenerRef.off('child_added');
                        eventListenerRef.off('child_changed');
                        eventListenerRef.off('child_moved');
                        eventListenerRef.off('child_removed');
                        console.log('Event Listeners Off');
                        subscribed = false;
                    }
                },

                resetDefaults: function(){
                    firstLotSize = 0;
                    nextLotSize = 0;
                    displayedItems = 0;
                    firstLotLoaded = false;
                    itemsRemaining = true;
                    fetching = false;
                    itemsArray = [];
                    ref = {};
                    objectBuilder = {};
                },


                /*
                * Getters
                * */


                getItems: function(){
                    return itemsArray;
                },

                getDisplayedTotal: function(){
                    return displayedItems;
                },

                isFetching: function(){
                    return fetching;
                },

                isFirstLotLoaded: function(){
                    return firstLotLoaded;
                },

                itemsRemaining: function(){
                    return itemsRemaining;
                },


                /*
                * Availability
                * */

                isAvailable: function(){
                    if(itemsArray.length && subscribed){
                        return false;
                    }else{
                        return true;
                    }
                },

                /*
                * Array Handlers
                * */
                addItem: function(snapshot, newItem){
                    if(!this.itemExists(snapshot)){
                        var elementObject = objectBuilder.buildFromSnapshot(snapshot);
                        if(newItem){
                            elementObject.newItem = true;
                        }
                        itemsArray.push(elementObject);
                        displayedItems += 1;
                    }
                },

                editItem: function(snapshot){
                    var newItem = objectBuilder.buildFromSnapshot(snapshot);
                    for(var i = 0; i < itemsArray.length; i++){
                        if(itemsArray[i].$id == newItem.$id){
                            itemsArray[i] = newItem;
                        }
                    }
                },

                removeItem: function(snapshot){
                    for(var i = 0; i < itemsArray.length; i++){
                        if(itemsArray[i].$id == snapshot.key){
                            itemsArray.splice(i, 1);
                            displayedItems -= 1;
                        }
                    }
                },

                itemExists: function(snapshot){
                    var exists = false;
                    for(var i = 0; i < itemsArray.length; i++){
                        if(itemsArray[i].$id == snapshot.key){
                            exists = true;
                        }
                    }
                    return exists;
                },

                sortArray: function(){
                    itemsArray.sort(function(a, b) {
                        return parseFloat(a.$priority) - parseFloat(b.$priority);
                    });
                }

             }
        }]);