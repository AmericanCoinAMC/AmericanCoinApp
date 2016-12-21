/**
 * Created by cem on 26-Oct-16.
 */
app.component('main', {
    templateUrl: '/core/components/app/main/main.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope','$timeout','FeedService','PostDialogService',
        function($rootScope, $scope, $timeout, FeedService, PostDialogService){
        /*
         * Pagination Variables
         * */

        $scope.firstLotSize = 12;
        $scope.paginationLotSize = 8;
        $scope.displayedItems = 0;
        $scope.itemsRemaining = true;

        $scope.paginating = false;

        $scope.hashtagsArray = [];

        $scope.firstLotLoaded = false;

        $scope.firstLotRef = rootRef
            .child('hashtags')
            .orderByPriority()
            .limitToFirst($scope.firstLotSize);

        $scope.firstLotRef.once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                $scope.addPaginationItem(childSnapshot);
            });
            $timeout(function () {
                $scope.loading = false;
                $scope.firstLotLoaded = true;
            });

        }).catch(function(err){
            console.log(err);
        });

        $scope.nextPaginationLot = function(){
            if(!$scope.paginating
                && $scope.hashtagsArray[parseInt($scope.displayedItems - 1)] != undefined
                && $scope.firstLotLoaded
                && $scope.itemsRemaining){
                $scope.paginating = true;
                var previousArrayLength = $scope.hashtagsArray.length;
                var nextLotRef =
                    rootRef
                        .child('hashtags')
                        .orderByPriority()
                        .startAt($scope.hashtagsArray[parseInt($scope.displayedItems - 1)].$priority + 1)
                        .limitToFirst($scope.paginationLotSize);
                nextLotRef.once('value').then(function(snapshot){
                    snapshot.forEach(function(childSnapshot) {
                        $scope.addPaginationItem(childSnapshot);
                    });
                    $timeout(function () {
                        if(previousArrayLength == $scope.hashtagsArray.length){$scope.itemsRemaining = false;}
                        $scope.paginating = false;
                    });
                }).catch(function(err){
                    console.log(err);
                });
            }
        };

        //$scope.postsRef = rootRef.child('posts');

        /*
         * Event Listeners
         * */
        $scope.firstLotRef.on('child_added', function(snapshot) {
            if($scope.firstLotLoaded){
                $scope.addPaginationItem(snapshot);
                $timeout(function () {$scope.sortArray();});
            }
        });

        $scope.firstLotRef.on('child_changed', function(snapshot) {
            if($scope.firstLotLoaded){
                $scope.editPaginationItem(snapshot);
                $timeout(function () {$scope.sortArray();});
            }
        });

        $scope.firstLotRef.on('child_moved', function(snapshot) {
            if($scope.firstLotLoaded){
                $scope.editPaginationItem(snapshot);
                $timeout(function () {$scope.sortArray();});
            }
        });

        /*$scope.firstLotRef.on('child_removed', function(snapshot) {
         if($scope.firstLotLoaded) {
         console.log('child_removed');
         console.log(snapshot.val());
         $scope.removePaginationItem(snapshot);
         $timeout(function () {$scope.sortArray();});
         }
         });*/






        /*
         * Array Handlers
         * */

        $scope.addPaginationItem = function(snapshot){
            if($scope.paginationItemExists(snapshot)){
                $scope.editPaginationItem(snapshot);
            }else{
                $scope.hashtagsArray.push({
                    $id: snapshot.key,
                    name: snapshot.val().name,
                    description: snapshot.val().description,
                    creationDate: snapshot.val().creationDate,
                    lastPost: snapshot.val().lastPost,
                    fileUrl: snapshot.val().fileUrl,
                    fileName: snapshot.val().fileName,
                    $priority: snapshot.getPriority()
                });
                $scope.displayedItems += 1;
            }
        };

        $scope.paginationItemExists = function(snapshot){
            var exists = false;
            for(var i = 0; i < $scope.hashtagsArray.length; i++){
                if($scope.hashtagsArray[i].$id == snapshot.key){
                    exists = true;
                }
            }
            return exists;
        };

        $scope.editPaginationItem = function(snapshot){
            for(var i = 0; i < $scope.hashtagsArray.length; i++){
                if($scope.hashtagsArray[i].$id == snapshot.key){
                    $scope.hashtagsArray[i].name =  snapshot.val().name;
                    $scope.hashtagsArray[i].description =  snapshot.val().description;
                    $scope.hashtagsArray[i].creationDate =  snapshot.val().creationDate;
                    $scope.hashtagsArray[i].lastPost =  snapshot.val().lastPost;
                    $scope.hashtagsArray[i].fileUrl =  snapshot.val().fileUrl;
                    $scope.hashtagsArray[i].fileName =  snapshot.val().fileName;
                    $scope.hashtagsArray[i].$priority =  snapshot.getPriority();
                }
            }
        };

        $scope.removePaginationItem = function(snapshot){
            for(var i = 0; i < $scope.hashtagsArray.length; i++){
                if($scope.hashtagsArray[i].$id == snapshot.key){
                    $scope.hashtagsArray.splice(i, 1);
                    $scope.displayedItems -= 1;
                }
            }
        };

        $scope.paginationItemExists = function(snapshot){
            var exists = false;
            for(var i = 0; i < $scope.hashtagsArray.length; i++){
                if($scope.hashtagsArray[i].$id == snapshot.key){
                    exists = true;
                }
            }
            return exists;
        };

        $scope.sortArray = function(){
            $scope.hashtagsArray.sort(function(a, b) {
                return parseFloat(a.$priority) - parseFloat(b.$priority);
            });
        };
    }]
});