/**
 * Created by Jess on 28-Oct-16.
 */

app.component('sourcePosts', {
    templateUrl: '/core/components/app/sourcePosts/sourcePosts.html',
    bindings: {
        sourceCategoriesData: '=',
        sourceData: '='
    },
    controller: ['$rootScope','$scope','$timeout',function($rootScope, $scope, $timeout){
        $scope.sourceCategoriesData = this.sourceCategoriesData;

        $scope.activeSource = this.sourceData;

        $scope.categoryActive = false;
        $scope.activeCategory = {};



        $scope.selectedIndex = 0;

        /*
         * Pagination Variables
         * */

        $scope.firstLotSize = 14;
        $scope.paginationLotSize = 21;
        $scope.displayedItems = 0;
        $scope.itemsRemaining = true;

        $scope.paginating = false;

        $scope.postsArray = [];

        $scope.firstLotLoaded = false;

        /*
         * Initializer
         * */
        $scope.$watch('selectedIndex', function(current, old){
            if(current != old){
                $scope.activateCategory(current);
            }
        });

        $scope.activateCategory = function(index){
            $scope.categoryActive = true;
            $scope.activeCategory = $scope.sourceCategoriesData[index];

            $scope.postsArray = [];
            $scope.displayedItems = 0;
            $scope.itemsRemaining = true;

            $scope.paginating = false;

            $scope.postsArray = [];

            $scope.firstLotLoaded = false;

            $scope.firstLotRef = rootRef
                .child('sourcePosts/' + $scope.activeSource.$id + '/' + $scope.activeCategory.$id)
                .orderByPriority()
                .limitToFirst($scope.firstLotSize);

            $scope.firstPaginationLot();

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

            $scope.firstLotRef.on('child_removed', function(snapshot) {
                if($scope.firstLotLoaded) {
                    $scope.removePaginationItem(snapshot);
                    $timeout(function () {$scope.sortArray();});
                }
            });
        };


        /*
         * Pagination Related
         * */

        $scope.firstPaginationLot = function(){
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
        };


        /*
         * Triggers Initializer
         * */
        $scope.activateCategory(0);


        $scope.nextPaginationLot = function(){
            if(!$scope.paginating
                && $scope.postsArray[parseInt($scope.displayedItems - 1)] != undefined
                && $scope.firstLotLoaded
                && $scope.itemsRemaining){
                $scope.paginating = true;
                var previousArrayLength = $scope.postsArray.length;
                var nextLotRef =
                    rootRef
                        .child('sourcePosts/' + $scope.activeSource.$id + '/' + $scope.activeCategory.$id)
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
            if(!$scope.paginationItemExists(snapshot)) {
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
                    category: snapshot.val().category,
                    source: snapshot.val().source,
                    hashtag: snapshot.val().hashtag,
                    $priority: snapshot.getPriority()
                });
                $scope.displayedItems += 1;
            }
        };

        $scope.paginationItemExists = function(snapshot){
            var exists = false;
            for(var i = 0; i < $scope.postsArray.length; i++){
                if($scope.postsArray[i].$id == snapshot.key){
                    exists = true;
                }
            }
            return exists;
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

        $scope.cleanArray = function(){

        };




    }]
});



