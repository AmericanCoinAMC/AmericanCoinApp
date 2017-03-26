/**
 * Created by Computadora on 17-Jan-17.
 */
/**
 * Created by Jess on 14-Oct-16.
 */
app.component('sourceConfigurationPanel', {
    templateUrl: '/core/components/app/sources/configuration/configuration.html',
    bindings:{

    },
    controller: [
        '$rootScope','$scope', '$stateParams', '$timeout', 'Dialog',
        function($rootScope, $scope, $stateParams, $timeout, Dialog){
            var self = this;
            $scope.configuring = false;

            $rootScope.$on('startConfiguringSource', function (event, data) {
                $scope.configuring = true;
                $scope.source = data;
            });


            $rootScope.$on('stopConfiguringSource', function (event, data) {
                $scope.configuring = false;
                $scope.source = {};
            });


        }]
});


