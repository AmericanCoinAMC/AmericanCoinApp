app.component("news",{templateUrl:"/core/components/app/news/news.html",bindings:{categoriesData:"="},controller:["$rootScope","$scope","PostObjectService","$state",function(e,t,a,c){t.categoriesData=this.categoriesData,t.categoryActive=!1,t.activeCategory={},t.selectedIndex=0,t.$watch("selectedIndex",function(e,a){e!=a&&t.activateCategory(e)}),t.activateCategory=function(e){t.categoryActive=!0,t.activeCategory=t.categoriesData[e],c.go("app.news.category",{categoryId:t.activeCategory.$id})},t.activateCategory(0)}]});