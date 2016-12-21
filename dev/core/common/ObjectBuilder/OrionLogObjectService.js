/**
 * Created by Computadora on 02-Dec-16.
 */

app.factory('OrionLogObjectService', function(){
    return{
        buildFromSnapshot: function(snapshot){
            return {
                $id: snapshot.key,
                code: snapshot.val().code,
                eventDate: snapshot.val().eventDate,
                title: snapshot.val().title,
                type: snapshot.val().type,
                data: snapshot.val().data,
                timestamp: snapshot.val().timestamp,
                $priority: snapshot.getPriority()
            };
        }
    }
});
