app.component("hashtags",{templateUrl:"/core/components/app/hashtags/hashtags.html",bindings:{},controller:["$scope","HashtagObjectService",function(t,e){t.config={ref:rootRef.child("hashtags"),objectBuilder:e,firstLotSize:8,nextLotSize:10,templateUrl:"/core/common/Hashtag/hashtagCards.tpl.html",wrapper:"infiniteScroll",deactivators:["$stateChangeSuccess"]}}]});