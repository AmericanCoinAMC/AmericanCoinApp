/**
 * Created by cem on 24-Nov-16.
 */
app.directive('articleCard',
    ['ArticleDialog',
    function(ArticleDialog){
    return {
        restrict: 'E',
        scope: {
            article: '='
        },
        templateUrl: '/core/common/modules/Article/Utilities/articleCard.html',
        link: function(scope, element, attrs) {

            var articleClass = new Article();

            scope.toggleOutstanding = function(item){
                articleClass.toggleOutstanding(item);
            };

            scope.displayArticle = function(event){
                ArticleDialog.display(event, scope.article);
            };

            /*
             * Watchers
             * */

            scope.$watch('article', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.article = newValue;
                }
            }, true);

        }
    }
}]);