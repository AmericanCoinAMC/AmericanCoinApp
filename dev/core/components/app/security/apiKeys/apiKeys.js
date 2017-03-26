app.component('securityApiKeys', {
    templateUrl: '/core/components/app/security/apiKeys/apiKeys.html',

    controller: ['$scope', '$rootScope', 'Message', '$timeout', function($scope, $rootScope, Message, $timeout){
        var apiKeysClass = new ApiKeys();

        $scope.submitting = false;
        $scope.loaded = false;

        $timeout(function(){
            $scope.loaded = true;
        }, 1000);



        $scope.saveKeys = function(){
            $scope.submitting = true;
            apiKeysClass.db.query.set($rootScope.apiKeysObject.item).then(function(){
                Message.toast({text: 'Changes Saved.', theme: 'toast-green'});
                $scope.cancel();
            }).catch(function(err){
                console.log(err);
            });
        };


        $scope.cancel = function(){
            $scope.submitting = false;
        };



    }]
});