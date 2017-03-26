app.factory('ArticleDialog',
    ['$mdDialog',
        function($mdDialog){

            return{
                display: function(ev, article){
                    $mdDialog.show({
                        templateUrl: '/core/common/modules/Article/Utilities/articleDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: true,
                        escapeToClose: true,
                        locals: {
                            article: article
                        },
                        controller:
                            ['$scope', '$mdDialog', 'article', '$sce', '$window',
                                function($scope, $mdDialog, article, $sce, $window){
                                    $scope.article = article;
                                    $scope.htmlContent = $sce.trustAsHtml(article.content);

                                    twttr.ready(
                                        function (twttr) {
                                            twttr.widgets.load();
                                        }
                                    );

                                    $scope.loadSource = function(){
                                        $window.open($scope.article.source.profile.website,'_blank');
                                    };

                                    $scope.closeDialog = function() {
                                        $mdDialog.hide();
                                    }
                                }]
                    });
                }
            }
        }]);