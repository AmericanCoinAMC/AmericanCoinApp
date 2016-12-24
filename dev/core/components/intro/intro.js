app.component('intro', {
    templateUrl: '/core/components/intro/intro.html',
    bindings: {

    },
    controller: ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout){
        $scope.signingIn = false;
        $scope.creatingAccount = false;

        $timeout(function(){
            $scope.signingIn = true;
        }, 500);
        $rootScope.$on('signingIn', function(e, args) {
            $scope.signingIn = true;
            $scope.creatingAccount = false;
        });

        $rootScope.$on('creatingAccount', function(e, args) {
            $scope.signingIn = false;
            $scope.creatingAccount = true;
        });
    }]
});
