/**
 * Created by Jess on 05-Jun-16.
 */
app.component('leftNavigation', {
    templateUrl: '/core/components/app/layout/leftNavigation.html',
    bindings: {

    },
    controller: [
        '$scope', 'SideNavigation', '$stateParams', '$rootScope', '$timeout',
        function($scope, SideNavigation, $stateParams, $rootScope, $timeout){
            $scope.newsSourceList = false;
            $scope.settingsSourceList = false;

            var sourceClass = new Source();

            $scope.sourcesArray = sourceClass.db.atomicArray;

            $scope.sourcesArray.$on({initialLotSize: 1000}).then(function(instanceID){
                document.addEventListener(instanceID + '_apply_filters', function () {$timeout(function(){})}, false);
            });

            $scope.toggleNewsSource = function(){
                $scope.newsSourceList = !$scope.newsSourceList;
            };

            $scope.toggleSettingsSource = function(){
                $scope.settingsSourceList = !$scope.settingsSourceList;
            };

            $scope.toggleLeft = function(){
                SideNavigation.toggleLeft()
            };

            $scope.close = function () {
                SideNavigation.close('left');
            };
        }]
});