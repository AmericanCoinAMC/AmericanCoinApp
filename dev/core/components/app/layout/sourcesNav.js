/**
 * Created by Jess on 15-Oct-16.
 */
app.component('sourcesNav', {
    templateUrl: '/core/components/app/layout/sourcesNav.html',
    bindings: {

    },
    controller: ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout){
        $scope.sourceExpanded = false;


        $scope.toggleSourceNav = function(){
            if($scope.sourceExpanded){
                $scope.sourceExpanded = false;
            }else{
                $scope.sourceExpanded = true;
            }
        };


        /*
         * Pagination Variables
         * */

        $scope.firstLotSize = 3;
        $scope.paginationLotSize = 5;
        $scope.displayedItems = 0;
        $scope.itemsRemaining = true;

        $scope.paginating = false;

        $scope.sourcesArray = [];

        $scope.firstLotLoaded = false;

        $scope.firstLotRef = rootRef
            .child('sources')
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
                && $scope.sourcesArray[parseInt($scope.displayedItems - 1)] != undefined
                && $scope.firstLotLoaded
                && $scope.itemsRemaining){
                $scope.paginating = true;
                var previousArrayLength = $scope.sourcesArray.length;
                var nextLotRef =
                    rootRef
                        .child('sources')
                        .orderByPriority()
                        .startAt($scope.sourcesArray[parseInt($scope.displayedItems - 1)].$priority + 1)
                        .limitToFirst($scope.paginationLotSize);
                nextLotRef.once('value').then(function(snapshot){
                    snapshot.forEach(function(childSnapshot) {
                        $scope.addPaginationItem(childSnapshot);
                    });
                    $timeout(function () {
                        if(previousArrayLength == $scope.sourcesArray.length){$scope.itemsRemaining = false;}
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

        $scope.firstLotRef.on('child_removed', function(snapshot) {
            if($scope.firstLotLoaded) {
                $scope.removePaginationItem(snapshot);
                $timeout(function () {$scope.sortArray();});
            }
        });






        /*
         * Array Handlers
         * */

        $scope.addPaginationItem = function(snapshot){
            if(!$scope.paginationItemExists(snapshot)){
                $scope.sourcesArray.push({
                    $id: snapshot.key,
                    name: snapshot.val().name,
                    description: snapshot.val().description,
                    fileUrl: snapshot.val().fileUrl,
                    fileName: snapshot.val().fileName,
                    ogConfig: snapshot.val().ogConfig,
                    postConfig: snapshot.val().postConfig,
                    profile: snapshot.val().profile,
                    selector: snapshot.val().selector,
                    status: snapshot.val().status,
                    $priority: snapshot.getPriority()
                });
                $scope.displayedItems += 1;
            }
        };

        $scope.paginationItemExists = function(snapshot){
            var exists = false;
            for(var i = 0; i < $scope.sourcesArray.length; i++){
                if($scope.sourcesArray[i].$id == snapshot.key){
                    exists = true;
                }
            }
            return exists;
        };

        $scope.editPaginationItem = function(snapshot){
            for(var i = 0; i < $scope.sourcesArray.length; i++){
                if($scope.sourcesArray[i].$id == snapshot.key){
                    $scope.sourcesArray[i].name =  snapshot.val().name;
                    $scope.sourcesArray[i].description =  snapshot.val().description;
                    $scope.sourcesArray[i].fileUrl =  snapshot.val().fileUrl;
                    $scope.sourcesArray[i].fileName =  snapshot.val().fileName;
                    $scope.sourcesArray[i].ogConfig =  snapshot.val().ogConfig;
                    $scope.sourcesArray[i].postConfig =  snapshot.val().postConfig;
                    $scope.sourcesArray[i].profile =  snapshot.val().profile;
                    $scope.sourcesArray[i].selector =  snapshot.val().selector;
                    $scope.sourcesArray[i].status =  snapshot.val().status;
                    $scope.sourcesArray[i].$priority =  snapshot.getPriority();
                }
            }
        };

        $scope.removePaginationItem = function(snapshot){
            for(var i = 0; i < $scope.sourcesArray.length; i++){
                if($scope.sourcesArray[i].$id == snapshot.key){
                    $scope.sourcesArray.splice(i, 1);
                    $scope.displayedItems -= 1;
                }
            }
        };

        $scope.sortArray = function(){
            $scope.sourcesArray.sort(function(a, b) {
                return parseFloat(a.$priority) - parseFloat(b.$priority);
            });
        };

    }]
})
.directive('sourceElement', function($rootScope, IgnoredSourcesService, Message, IgnoredSources){
    return {
        restrict: 'E',
        scope: {
            source: '='
        },
        templateUrl: '/core/components/app/layout/sourceElement.html',
        link: function(scope, element, attrs) {
            scope.ignoredSources = IgnoredSources(rootRef.child('ignoredSources/' + $rootScope.userInfo.$id));

            scope.ignoredSources.$loaded().then(function(){
                scope.isIgnored = !scope.ignoredSources.isSourceIgnored(scope.source);
            });

            scope.$watch('isIgnored', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.isIgnored = newValue;
                }
            }, true);

            scope.toggleSource = function(source){
                if(scope.ignoredSources.isSourceIgnored(source)){
                    scope.unignoreSource(source);
                }else{
                    scope.ignoreSource(source);
                }
            };

            scope.ignoreSource = function (source) {
                IgnoredSourcesService.ignoreSource(source).then(function(){

                }).catch(function(err){
                    console.log(err);
                    Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                });
            };

            scope.unignoreSource = function (source) {
                IgnoredSourcesService.unignoreSource(source).then(function(){

                }).catch(function(err){
                    console.log(err);
                    Message.toast({text: 'Hubo un error.', theme: 'toast-red'})
                });
            };
        }
    }
});