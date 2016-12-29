/**
 * Created by Jess on 16-Oct-16.
 */

app.factory('ActiveSources',[
    '$rootScope', '$firebaseArray', '$q',
    function($rootScope, $firebaseArray, $q){
    var ActiveSources = $firebaseArray.$extend({

        getTotal: function(){
            var items = 0;
            angular.forEach(this.$list, function(rec){
                items += 1;
            });
            return items;
        }

    });

    return function(ref){
        return new ActiveSources(ref);
    }
}]);