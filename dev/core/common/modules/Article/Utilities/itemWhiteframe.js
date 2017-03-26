/**
 * Created by Computadora on 25-Dec-16.
 */
/**
 * Created by Computadora on 31-Oct-16.
 */
app.directive('itemWhiteframe', [function(){
    return {
        restrict: 'A',
        scope: {
            article: '=itemWhiteframe'
        },
        link: function(scope, element, attrs) {
            scope.setDepth = function(){
                if(scope.article != undefined){
                    if(scope.article.type != undefined && scope.article.type == 'ads'){
                        element.addClass('md-whiteframe-14dp');
                    }else if(scope.article.oustanding && scope.article.primaryHashtag && scope.article.secondaryHashtags && scope.article.leaders){
                        element.addClass('md-whiteframe-12dp');
                    }else if(scope.article.oustanding && scope.article.primaryHashtag && scope.article.secondaryHashtags){
                        element.addClass('md-whiteframe-11dp');
                    }else if(scope.article.oustanding && scope.article.primaryHashtag && scope.article.leaders){
                        element.addClass('md-whiteframe-10dp');
                    }else if(scope.article.oustanding && scope.article.primaryHashtag){
                        element.addClass('md-whiteframe-9dp');
                    }else if(scope.article.oustanding){
                        element.addClass('md-whiteframe-8dp');
                    }else if(scope.article.primaryHashtag && scope.article.secondaryHashtags && scope.article.leaders){
                        element.addClass('md-whiteframe-7dp');
                    }else if(scope.article.primaryHashtag && scope.article.secondaryHashtags){
                        element.addClass('md-whiteframe-6dp');
                    }else if(scope.article.primaryHashtag && scope.article.leaders){
                        element.addClass('md-whiteframe-5dp');
                    }else if(scope.article.primaryHashtag){
                        element.addClass('md-whiteframe-4dp');
                    }else if(scope.article.leaders){
                        element.addClass('md-whiteframe-3dp');
                    }else{
                        element.addClass('md-whiteframe-1dp');
                    }
                }
            };
            scope.setDepth();

            scope.$watch('article', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.article = newValue;
                    scope.setDepth();
                }
            }, true);
        }
    }
}]);