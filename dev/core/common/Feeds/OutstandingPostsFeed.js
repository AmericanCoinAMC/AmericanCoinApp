/**
 * Created by Jess on 20-Sep-16.
 */
app.factory('OutstandingPostsFeed',
    ['$mdDialog',
    function($mdDialog){

    return{
        loadFeed: function(ev){
            $mdDialog.show({
                templateUrl: '/core/common/Feeds/outstandingPosts.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true,
                escapeToClose: true,
                controller:
                    ['$rootScope', '$scope', '$mdDialog', '$firebaseArray', 'PostDialogService', '$timeout',
                    function DialogController($rootScope, $scope, $mdDialog, $firebaseArray, PostDialogService, $timeout) {
                    $scope.loading = true;

                    $scope.firstLotSize = 12;
                    $scope.paginationLotSize = 5;
                    $scope.displayedItems = 0;
                    $scope.itemsRemaining = true;

                    $scope.paginating = false;

                    $scope.postsArray = [];

                    $scope.firstLotLoaded = false;


                    /*
                     * Pagination Related Methods
                     * */

                    var postsRef = rootRef.child('outstandingPosts')
                        .orderByPriority()
                        .limitToFirst($scope.firstLotSize);

                    postsRef.once('value').then(function(snapshot){
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



                    /*
                     * Event Listeners
                     * */
                    postsRef.on('child_added', function(snapshot) {
                        if($scope.firstLotLoaded){
                            if(!$scope.arrayHasKey(snapshot.key, $scope.postsArray)){
                                $scope.addPaginationItem(snapshot);
                                $timeout(function () {$scope.sortArray();});
                            }
                        }
                    });

                    postsRef.on('child_changed', function(snapshot) {
                        if($scope.firstLotLoaded){
                            $scope.editPaginationItem(snapshot);
                            $timeout(function () {$scope.sortArray();});
                        }
                    });

                    postsRef.on('child_removed', function(snapshot) {
                        if($scope.firstLotLoaded) {
                            $scope.removePaginationItem(snapshot);
                            $timeout(function () {$scope.sortArray();});
                        }
                    });




                    $scope.nextPaginationLot = function(){
                        if(!$scope.paginating
                            && $scope.postsArray[parseInt($scope.displayedItems - 1)] != undefined
                            && $scope.firstLotLoaded
                            && $scope.itemsRemaining){
                            $scope.paginating = true;

                            var previousArrayLength = $scope.postsArray.length;
                            var nextLotRef =
                                rootRef
                                    .child('outstandingPosts')
                                    .orderByPriority()
                                    .startAt($scope.postsArray[parseInt($scope.displayedItems - 1)].$priority + 1)
                                    .limitToFirst($scope.paginationLotSize);
                            nextLotRef.once('value').then(function(snapshot){
                                snapshot.forEach(function(childSnapshot) {
                                    $scope.addPaginationItem(childSnapshot);
                                });
                                $timeout(function () {
                                    if(previousArrayLength == $scope.postsArray.length){$scope.itemsRemaining = false;}
                                    $scope.paginating = false;
                                });
                            }).catch(function(err){
                                console.log(err);
                            });
                        }
                    };


                    /*
                     * Array Handlers
                     * */

                    $scope.addPaginationItem = function(snapshot){
                        $scope.postsArray.push({
                            $id: snapshot.key,
                            url: snapshot.val().url,
                            title: snapshot.val().title,
                            description: snapshot.val().description,
                            image: snapshot.val().image,
                            content: snapshot.val().content,
                            eventDate: snapshot.val().eventDate,
                            outstanding: snapshot.val().outstanding,
                            scrapingDuration: snapshot.val().scrapingDuration,
                            source: snapshot.val().source,
                            hashtag: snapshot.val().hashtag,
                            $priority: snapshot.getPriority()
                        });
                        $scope.displayedItems += 1;
                    };

                    $scope.arrayHasKey = function(key, array){
                        var keyFound = false;
                        for(var i = 0; i < array.length; i++){
                            if(array[i].$id == key){
                                keyFound = true;
                            }
                        }
                        return keyFound;
                    };

                    $scope.editPaginationItem = function(snapshot){
                        for(var i = 0; i < $scope.postsArray.length; i++){
                            if($scope.postsArray[i].$id == snapshot.key){
                                $scope.postsArray[i].url =  snapshot.val().url;
                                $scope.postsArray[i].title =  snapshot.val().title;
                                $scope.postsArray[i].image =  snapshot.val().image;
                                $scope.postsArray[i].content =  snapshot.val().content;
                                $scope.postsArray[i].eventDate =  snapshot.val().eventDate;
                                $scope.postsArray[i].outstanding =  snapshot.val().outstanding;
                                $scope.postsArray[i].scrapingDuration =  snapshot.val().scrapingDuration;
                                $scope.postsArray[i].source =  snapshot.val().source;
                                $scope.postsArray[i].hashtag =  snapshot.val().hashtag;
                                $scope.postsArray[i].$priority =  snapshot.getPriority();
                            }
                        }
                    };

                    $scope.removePaginationItem = function(snapshot){
                        for(var i = 0; i < $scope.postsArray.length; i++){
                            if($scope.postsArray[i].$id == snapshot.key){
                                $scope.postsArray.splice(i, 1);
                                $scope.displayedItems -= 1;
                            }
                        }
                    };

                    $scope.sortArray = function(){
                        $scope.postsArray.sort(function(a, b) {
                            return parseFloat(a.$priority) - parseFloat(b.$priority);
                        });
                    };

                    $scope.displayPost = function(event, post){
                        $mdDialog.hide();
                        $rootScope.preloader = true;
                        $timeout(function () {
                            $rootScope.preloader = false;
                            PostDialogService.displayPost(event, post);
                        }, 700);
                    };

                    $scope.closeDialog = function() {
                        $scope.restoreDefaults();
                        $mdDialog.hide();
                    };

                    $scope.restoreDefaults = function(){
                        $scope.postsArray = [];
                        $scope.displayedItems = 0;
                        $scope.itemsRemaining = true;
                    };
                }]
            });
        }
    }
}]);

