/**
 * Created by Jess on 07-Jul-16.
 */

app.factory('SideNavigation',
    ['$timeout', '$mdSidenav',
    function($timeout, $mdSidenav){
    return{
        toggleLeft: function(){
            this.buildDelayedToggler('left');
        },

        toggleRight: function(){
            this.buildDelayedToggler('right');
        },

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        buildDelayedToggler: function(navID){
            return this.debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                    });
            }, 200);
        },

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        debounce: function(func, wait, context){
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        },

        buildToggler: function(navID){
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                    });
            }
        },

        toggle: function(navId){
            $mdSidenav(navId).toggle();
        },
        close: function(navId){
            $mdSidenav(navId).close()
                .then(function () {
                });
        }
    }
}]);
