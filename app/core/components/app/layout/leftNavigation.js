app.component("leftNavigation",{templateUrl:"/core/components/app/layout/leftNavigation.html",bindings:{},controller:["$scope","SideNavigation",function(t,o){t.toggleLeft=function(){o.toggleLeft()},t.close=function(){o.close("left")}}]});