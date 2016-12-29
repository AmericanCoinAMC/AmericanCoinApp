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
            post: '=itemWhiteframe'
        },
        link: function(scope, element, attrs) {
            scope.setDepth = function(){
                if(scope.post != undefined){
                    if(scope.post.type != undefined && scope.post.type == 'ads'){
                        element.addClass('md-whiteframe-14dp');
                    }else if(scope.post.oustanding && scope.post.primaryHashtag && scope.post.secondaryHashtags && scope.post.leaders){
                        element.addClass('md-whiteframe-12dp');
                    }else if(scope.post.oustanding && scope.post.primaryHashtag && scope.post.secondaryHashtags){
                        element.addClass('md-whiteframe-11dp');
                    }else if(scope.post.oustanding && scope.post.primaryHashtag && scope.post.leaders){
                        element.addClass('md-whiteframe-10dp');
                    }else if(scope.post.oustanding && scope.post.primaryHashtag){
                        element.addClass('md-whiteframe-9dp');
                    }else if(scope.post.oustanding){
                        element.addClass('md-whiteframe-8dp');
                    }else if(scope.post.primaryHashtag && scope.post.secondaryHashtags && scope.post.leaders){
                        element.addClass('md-whiteframe-7dp');
                    }else if(scope.post.primaryHashtag && scope.post.secondaryHashtags){
                        element.addClass('md-whiteframe-6dp');
                    }else if(scope.post.primaryHashtag && scope.post.leaders){
                        element.addClass('md-whiteframe-5dp');
                    }else if(scope.post.primaryHashtag){
                        element.addClass('md-whiteframe-4dp');
                    }else if(scope.post.leaders){
                        element.addClass('md-whiteframe-3dp');
                    }else{
                        element.addClass('md-whiteframe-1dp');
                    }
                }
            };
            scope.setDepth();

            scope.$watch('post', function(newValue, oldValue) {
                if(newValue != undefined){
                    scope.post = newValue;
                    scope.setDepth();
                }
            }, true);
        }
    }
}]);