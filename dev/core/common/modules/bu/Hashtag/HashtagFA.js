/**
 * Created by Computadora on 02-Jan-17.
 */

app.factory('HashtagFA', ['$firebaseArray', function($firebaseArray){
    var HashtagFA = $firebaseArray.$extend({
        getTotal: function(){
            var items = 0;
            angular.forEach(this.$list, function(rec){
                items += 1;
            });
            return items;
        }
    });

    return function(ref){
        return new HashtagFA(ref);
    }
}]);