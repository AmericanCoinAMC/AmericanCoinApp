app.factory("OrionLogObjectService",function(){return{buildFromSnapshot:function(e){return{$id:e.key,code:e.val().code,eventDate:e.val().eventDate,title:e.val().title,type:e.val().type,data:e.val().data,timestamp:firebase.database.ServerValue.TIMESTAMP,$priority:e.getPriority()}}}});