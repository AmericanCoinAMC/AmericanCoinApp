app.directive("articleCard",["ArticleDialog",function(t){return{restrict:"E",scope:{article:"="},templateUrl:"/core/common/modules/Article/Utilities/articleCard.html",link:function(i,e,c){var l=new Article;i.toggleOutstanding=function(t){l.toggleOutstanding(t)},i.displayArticle=function(e){t.display(e,i.article)},i.$watch("article",function(t,e){void 0!=t&&(i.article=t)},!0)}}}]);