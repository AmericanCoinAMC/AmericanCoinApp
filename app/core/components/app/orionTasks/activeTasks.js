app.component("orionActiveTasks",{templateUrl:"/core/components/app/orionTasks/activeTasks.html",controller:["$rootScope","$scope","$mdBottomSheet",function(o,t,e){t.taskInformation=function(o){e.show({templateUrl:"/core/components/app/orionTasks/taskInformationSheet.html",escapeToClose:!0,disableBackdrop:!1,clickOutsideToClose:!0,disableParentScroll:!1,locals:{task:o},controller:["$scope","$mdBottomSheet","task",function(o,t,e){o.task=e,o.hide=function(){t.hide()}}]}).then(function(o){})}}]});