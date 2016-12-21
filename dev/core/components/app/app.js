/**
 * Created by cem on 15-Oct-16.
 */

app.component('app', {
    templateUrl: '/core/components/app/app.html',
    bindings: {
        ignoredSources: '='
    },
    controller: ['$scope', function($scope){
        $scope.ignoredSources = this.ignoredSources;

    }]
});
