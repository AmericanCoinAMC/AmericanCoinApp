app.factory("ArticleDialog",["$mdDialog",function(e){return{display:function(t,o){e.show({templateUrl:"/core/common/modules/Article/Utilities/articleDialog.html",parent:angular.element(document.body),targetEvent:t,clickOutsideToClose:!0,fullscreen:!0,escapeToClose:!0,locals:{article:o},controller:["$scope","$mdDialog","article","$sce","$window",function(e,t,o,l,c){e.article=o,e.htmlContent=l.trustAsHtml(o.content),twttr.ready(function(e){e.widgets.load()}),e.loadSource=function(){c.open(e.article.source.profile.website,"_blank")},e.closeDialog=function(){t.hide()}}]})}}}]);