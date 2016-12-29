/**
 * Created by Computadora on 10-Dec-16
 */

app.factory('InfiniteDisplay',
    ['$timeout', '$q', '$rootScope', 'Server',
        function($timeout, $q, $rootScope, Server){
            /*
             * Initializers
             * */

            var InfiniteDisplay = function(infiniteDisplayConfig) {
                this.id = 0;
                this.ref = infiniteDisplayConfig.ref;
                this.objectBuilder = infiniteDisplayConfig.objectBuilder;
                this.firstLotSize = infiniteDisplayConfig.firstLotSize;
                this.nextLotSize = infiniteDisplayConfig.nextLotSize;
                this.eventListenerRef = null;
                this.displayedItems = 0;
                this.subscribed = false;
                this.firstLotLoaded = false;
                this.itemsRemaining = true;
                this.fetching = false;
                this.items = [];
            };

            InfiniteDisplay.prototype.initialize = function(){
                var deferred = $q.defer();
                this.loadFirstLot().then(angular.bind(this, function(){
                    Server.updateTimestamp().then(angular.bind(this, function(){
                        Server.getTimestamp().then(angular.bind(this, function(timestamp){
                            this.eventListenerRef = this.ref.orderByChild('timestamp').startAt(timestamp);
                            this.id = timestamp;
                            this.firstLotLoaded = true;
                            this.subscribe();
                            deferred.resolve(this.id);
                        })).catch(function(err){deferred.reject(err);});
                    })).catch(function(err){deferred.reject(err);});
                })).catch(function(err){deferred.reject(err);});
                return deferred.promise;
            };



            /*
             * Data Loaders
             * */

            InfiniteDisplay.prototype.loadFirstLot = function(){
                var deferred = $q.defer();
                var firstLotRef = this.ref.limitToFirst(this.firstLotSize);
                firstLotRef.once('value').then(angular.bind(this, function(snapshot){
                    snapshot.forEach(angular.bind(this, function(childSnapshot) {
                        this.addItem(childSnapshot, false);
                    }));
                    deferred.resolve(true);
                })).catch(function(err){deferred.reject(err);});
                return deferred.promise;
            };

            InfiniteDisplay.prototype.loadNextLot = function(){
                var deferred = $q.defer();
                if(!this.fetching && this.items[parseInt(this.displayedItems - 1)] != undefined){
                    this.fetching = true;
                    var previousArrayLength = this.items.length;
                    var nextLotRef =
                        this.ref.startAt(this.items[parseInt(this.displayedItems - 1)].$priority + 1)
                            .limitToFirst(this.nextLotSize);
                    nextLotRef.once('value').then(angular.bind(this, function(snapshot){
                        snapshot.forEach(angular.bind(this, function(childSnapshot) {
                            this.addItem(childSnapshot, false);
                        }));
                        if(previousArrayLength == this.items.length){
                            this.itemsRemaining = false;
                        }
                        $timeout(angular.bind(this, function(){
                            this.fetching = false;
                            deferred.resolve(true);
                        }), 4000);
                    })).catch(function(err){
                        deferred.reject(err);
                    });
                }else{
                    $timeout(function(){
                        deferred.resolve(false);
                    }, 2000);
                }
                return deferred.promise;
            };



            /*
             * Event Listeners Subscriber
             * */

            InfiniteDisplay.prototype.subscribe = function(){
                this.subscribed = true;
                this.eventListenerRef.on('child_added', angular.bind(this, function(snapshot) {
                    console.log('child_added');
                    this.addItem(snapshot, true);
                }));

                this.eventListenerRef.on('child_changed', angular.bind(this, function(snapshot) {
                    console.log('child_changed');
                    this.editItem(snapshot, true);
                }));

                this.eventListenerRef.on('child_moved', angular.bind(this, function(snapshot) {
                    console.log('child_moved');
                    this.editItem(snapshot, true);
                }));

                this.eventListenerRef.on('child_removed', angular.bind(this, function(snapshot) {
                    console.log('child_removed');
                    this.removeItem(snapshot);
                }));
                console.log('Infinite Display Instance: ' + this.id + ' subscribed.');
            };


            /*
             * Getters
             * */

            InfiniteDisplay.prototype.getId = function(){
                return this.id;
            };

            InfiniteDisplay.prototype.getItems = function(){
                return this.items;
            };

            InfiniteDisplay.prototype.getDisplayedItems = function(){
                return this.displayedItems;
            };

            InfiniteDisplay.prototype.isFetching = function(){
                return this.fetching;
            };

            InfiniteDisplay.prototype.isFirstLotLoaded = function(){
                return this.firstLotLoaded;
            };

            InfiniteDisplay.prototype.getItemsRemaining = function(){
                return this.itemsRemaining;
            };



            /*
             * Array Handlers
             * */

            InfiniteDisplay.prototype.addItem = function(snapshot, newItem){
                if(!this.itemExists(snapshot)){
                    var elementObject = this.objectBuilder.buildFromSnapshot(snapshot);
                    if(newItem){
                        elementObject.newItem = true;
                    }
                    this.items.push(elementObject);
                    this.displayedItems += 1;
                }
            };

            InfiniteDisplay.prototype.editItem = function(snapshot){
                var newItem = this.objectBuilder.buildFromSnapshot(snapshot);
                for(var i = 0; i < this.items.length; i++){
                    if(this.items[i].$id == newItem.$id){
                        this.items[i] = newItem;
                    }
                }
            };

            InfiniteDisplay.prototype.removeItem = function(snapshot){
                for(var i = 0; i < this.items.length; i++){
                    if(this.items[i].$id == snapshot.key){
                        this.items.splice(i, 1);
                        this.displayedItems -= 1;
                    }
                }
            };

            InfiniteDisplay.prototype.itemExists = function(snapshot){
                var exists = false;
                for(var i = 0; i < this.items.length; i++){
                    if(this.items[i].$id == snapshot.key){
                        exists = true;
                    }
                }
                return exists;
            };



            /*
             * Deactivators
             * */

            InfiniteDisplay.prototype.deactivate = function(){
                this.unsubscribe();
                this.resetDefaults();
            };

            InfiniteDisplay.prototype.unsubscribe = function(){
                if(this.subscribed){
                    this.eventListenerRef.off('child_added');
                    this.eventListenerRef.off('child_changed');
                    this.eventListenerRef.off('child_moved');
                    this.eventListenerRef.off('child_removed');
                    this.subscribed = false;
                    console.log('Infinite Display Instance: ' + this.id + ' unsubscribed.');
                }
            };

            InfiniteDisplay.prototype.resetDefaults = function(){
                this.id = 0;
                this.ref = null;
                this.eventListenerRef = null;
                this.objectBuilder = null;
                this.firstLotSize = null;
                this.nextLotSize = null;
                this.displayedItems = 0;
                this.subscribed = false;
                this.firstLotLoaded = false;
                this.itemsRemaining = true;
                this.fetching = false;
                this.items = [];
            };

            return InfiniteDisplay;
        }]);