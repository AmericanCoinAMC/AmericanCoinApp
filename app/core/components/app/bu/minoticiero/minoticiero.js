app.component("minoticiero",{templateUrl:"/core/components/app/minoticiero/minoticiero.html",bindings:{},controller:["$rootScope","$scope","$timeout","PostObjectService",function(t,e,i,o){e.browserDiff=128,e.splitDiff=50,e.browserHeight=parseInt(document.documentElement.clientHeight),e.totalHeight=e.browserHeight-e.browserDiff,e.splitHeight=e.totalHeight/2-e.splitDiff,t.appContainer="static-views-container",e.contentReady=!1,i(function(){e.contentReady=!0},1500),e.config={parentContainer:"#user-news-container",ref:rootRef.child("posts"),objectBuilder:o,firstLotSize:8,nextLotSize:10,templateUrl:"/core/common/Post/postList.tpl.html",wrapper:"infiniteScroll",filters:["activeSources","userIgnoredSources"],deactivators:["$stateChangeSuccess"]},e.getBrowserHeight=function(){return parseInt(document.documentElement.clientHeight)},e.$watch("getBrowserHeight()",function(t,i){void 0!=t&&(e.browserHeight=t,e.totalHeight=e.browserHeight-e.browserDiff,e.splitHeight=e.totalHeight/2-e.splitDiff)},!0),t.$on("$stateChangeStart",function(e,i,o,n,r,c){t.appContainer="views-container"})}]});