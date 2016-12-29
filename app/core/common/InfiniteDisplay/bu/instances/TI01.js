app.factory("TI01",["$timeout","$q","$rootScope","Server",function(t,n,i,e){var o,r,a,s,c,u=0,d=!1,l=!1,h=!0,f=!1,m=[];return{initialize:function(t){var i=n.defer();return this.deactivate(),o=t.firstLotSize,r=t.nextLotSize,a=t.ref,c=t.objectBuilder,e.updateTimestamp().then(angular.bind(this,function(){this.loadFirstLot().then(angular.bind(this,function(){l=!0,i.resolve(!0)})).catch(function(t){i.reject(t)})})).catch(function(t){i.reject(t)}),i.promise},loadFirstLot:function(){var t=n.defer(),i=a.limitToFirst(o);return i.once("value").then(angular.bind(this,function(n){n.forEach(angular.bind(this,function(t){this.addItem(t)})),e.getTimestamp().then(angular.bind(this,function(n){s=a.orderByChild("timestamp").startAt(n),this.subscribe(),l=!0,t.resolve(!0)})).catch(function(n){t.reject(n)})})).catch(function(n){t.reject(n)}),t.promise},loadNextLot:function(){var i=n.defer();if(f||void 0==m[parseInt(u-1)])i.resolve(!1);else{f=!0;var e=m.length,o=a.startAt(m[parseInt(u-1)].$priority+1).limitToFirst(r);o.once("value").then(angular.bind(this,function(n){n.forEach(angular.bind(this,function(t){this.addItem(t)})),e==m.length&&(h=!1),t(function(){f=!1,i.resolve(!0)},4e3)})).catch(function(t){i.reject(t)})}return i.promise},subscribe:function(){d=!0,s.on("child_added",angular.bind(this,function(n){l&&(console.log("child_added"),this.addItem(n,!0),t(angular.bind(this,function(){this.sortArray()})))})),s.on("child_changed",angular.bind(this,function(n){l&&(console.log("child_changed"),this.editItem(n),t(angular.bind(this,function(){this.sortArray()})))})),s.on("child_moved",angular.bind(this,function(n){l&&(console.log("child_moved"),this.editItem(n),t(angular.bind(this,function(){this.sortArray()})))})),s.on("child_removed",angular.bind(this,function(n){l&&(console.log("child_removed"),this.removeItem(n),t(angular.bind(this,function(){this.sortArray()})))})),i.$on("deactivateTemporaryInstance",angular.bind(this,function(){this.deactivate()})),console.log("Event Listeners On")},deactivate:function(){this.unsubscribe(),this.resetDefaults()},unsubscribe:function(){d&&(s.off("child_added"),s.off("child_changed"),s.off("child_moved"),s.off("child_removed"),console.log("Event Listeners Off"),d=!1)},resetDefaults:function(){o=0,r=0,u=0,l=!1,h=!0,f=!1,m=[],a={},c={}},getItems:function(){return m},getDisplayedTotal:function(){return u},isFetching:function(){return f},isFirstLotLoaded:function(){return l},itemsRemaining:function(){return h},isAvailable:function(){return!m.length||!d},addItem:function(t,n){if(!this.itemExists(t)){var i=c.buildFromSnapshot(t);n&&(i.newItem=!0),m.push(i),u+=1}},editItem:function(t){for(var n=c.buildFromSnapshot(t),i=0;i<m.length;i++)m[i].$id==n.$id&&(m[i]=n)},removeItem:function(t){for(var n=0;n<m.length;n++)m[n].$id==t.key&&(m.splice(n,1),u-=1)},itemExists:function(t){for(var n=!1,i=0;i<m.length;i++)m[i].$id==t.key&&(n=!0);return n},sortArray:function(){m.sort(function(t,n){return parseFloat(t.$priority)-parseFloat(n.$priority)})}}}]);