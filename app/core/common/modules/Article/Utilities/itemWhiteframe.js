app.directive("itemWhiteframe",[function(){return{restrict:"A",scope:{article:"=itemWhiteframe"},link:function(a,e,t){a.setDepth=function(){void 0!=a.article&&(void 0!=a.article.type&&"ads"==a.article.type?e.addClass("md-whiteframe-14dp"):a.article.oustanding&&a.article.primaryHashtag&&a.article.secondaryHashtags&&a.article.leaders?e.addClass("md-whiteframe-12dp"):a.article.oustanding&&a.article.primaryHashtag&&a.article.secondaryHashtags?e.addClass("md-whiteframe-11dp"):a.article.oustanding&&a.article.primaryHashtag&&a.article.leaders?e.addClass("md-whiteframe-10dp"):a.article.oustanding&&a.article.primaryHashtag?e.addClass("md-whiteframe-9dp"):a.article.oustanding?e.addClass("md-whiteframe-8dp"):a.article.primaryHashtag&&a.article.secondaryHashtags&&a.article.leaders?e.addClass("md-whiteframe-7dp"):a.article.primaryHashtag&&a.article.secondaryHashtags?e.addClass("md-whiteframe-6dp"):a.article.primaryHashtag&&a.article.leaders?e.addClass("md-whiteframe-5dp"):a.article.primaryHashtag?e.addClass("md-whiteframe-4dp"):a.article.leaders?e.addClass("md-whiteframe-3dp"):e.addClass("md-whiteframe-1dp"))},a.setDepth(),a.$watch("article",function(e,t){void 0!=e&&(a.article=e,a.setDepth())},!0)}}}]);