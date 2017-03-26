/**
 * Created by cem on 26-Oct-16.
 */
app.component('minoticiero', {
    templateUrl: '/core/components/app/minoticiero/minoticiero.html',
    bindings: {

    },
    controller: [
        '$rootScope','$scope','$timeout', 'PostObjectService',
        function($rootScope, $scope, $timeout, PostObjectService){
            $scope.browserDiff = 128;
            $scope.splitDiff = 50;
            $scope.browserHeight = parseInt(document.documentElement.clientHeight);
            $scope.totalHeight = $scope.browserHeight - $scope.browserDiff;
            $scope.splitHeight = ($scope.totalHeight / 2) - $scope.splitDiff;

            $rootScope.appContainer = 'static-views-container';

            $scope.contentReady = false;

            $timeout(function(){
                $scope.contentReady = true;
            }, 1500);

            $scope.config = {
                parentContainer: '#user-news-container',
                ref: rootRef.child('posts'),
                objectBuilder: PostObjectService,
                firstLotSize: 8,
                nextLotSize: 10,
                templateUrl: '/core/common/Post/postList.tpl.html',
                wrapper: 'infiniteScroll',
                filters: ['activeSources', 'userIgnoredSources'],
                deactivators: ['$stateChangeSuccess']
            };

            $scope.getBrowserHeight = function(){
                return parseInt(document.documentElement.clientHeight);
            };

            $scope.$watch('getBrowserHeight()', function(newValue, oldValue) {
                if(newValue != undefined){
                    $scope.browserHeight = newValue;
                    $scope.totalHeight = $scope.browserHeight - $scope.browserDiff;
                    $scope.splitHeight = ($scope.totalHeight / 2) - $scope.splitDiff;

                }
            }, true);

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options) {
                    $rootScope.appContainer = 'views-container';
                });
    }]
});