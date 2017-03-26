
app.factory('Dialog',
    ['$mdDialog', '$q',
    function($mdDialog, $q){
    return{
        show: function(ev, $scope, showConfig){
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                templateUrl: showConfig.templateUrl,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: true,
                escapeToClose: false
            });
        },
        hide: function(){
            $mdDialog.hide();
        },

        prompt: function(ev, promptConfig){
            var deferred = $q.defer();
            var confirm = $mdDialog.prompt()
                .title(promptConfig.title)
                .textContent(promptConfig.textContent)
                .placeholder(promptConfig.placeholder)
                .ariaLabel('Prompt Element')
                .initialValue(promptConfig.initialValue)
                .targetEvent(ev)
                .ok(promptConfig.okText)
                .cancel(promptConfig.cancelText);
            $mdDialog.show(confirm).then(function(response) {
                deferred.resolve(response);
            }, function() {
                deferred.resolve('');
            });
            return deferred.promise;
        },

        confirm: function(ev, confirmConfig){
            var deferred = $q.defer();
            var confirm = $mdDialog.confirm()
                .title(confirmConfig.title)
                .textContent(confirmConfig.textContent)
                .targetEvent(ev)
                .ok(confirmConfig.okText)
                .cancel(confirmConfig.cancelText);
            $mdDialog.show(confirm).then(function() {
                deferred.resolve(true);
            }, function() {
                deferred.resolve(false);
            });
            return deferred.promise;
        }
    }
}]);
