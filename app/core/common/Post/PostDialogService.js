app.factory("PostDialogService",["$mdDialog",function(t){return{displayPost:function(o,e){t.show({templateUrl:"/core/common/Post/postDialog.html",parent:angular.element(document.body),targetEvent:o,clickOutsideToClose:!0,fullscreen:!0,escapeToClose:!0,locals:{postObject:e},controller:["$scope","$mdDialog","postObject","$sce",function(t,o,e,l){t.postObject=e,t.htmlContent=l.trustAsHtml(e.content),twttr.ready(function(t){t.widgets.load()}),t.closeDialog=function(){o.hide()}}]})}}}]);