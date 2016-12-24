/**
 * Created by cem on 15-Oct-16.
 */

app.component('app', {
    templateUrl: '/core/components/app/app.html',
    bindings: {
        ignoredSources: '='
    },
    controller: [
        '$rootScope','$scope',
        function($rootScope, $scope){
            $scope.ignoredSources = this.ignoredSources;

        }]
});
