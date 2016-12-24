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

    }]
});