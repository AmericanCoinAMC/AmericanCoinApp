/**
 * Created by Computadora on 06-Feb-17.
 */

app.factory('OrionArticleBuilder', [
    '$q', '$rootScope', 'OrionOpenGraphExtractor', 'OrionArticleUrlExtractor', 'OrionDataPurifier',
    function($q, $rootScope, OrionOpenGraphExtractor, OrionArticleUrlExtractor, OrionDataPurifier){

        var openGraph, articleContent, extractionObject;

        var article = {
            url: null,
            title: null,
            description: null,
            image: null,
            content: null
        };

        var sourceExtractionAlternatives = ['primary', 'secondary', 'terciary', 'quaternary'];

        return{


            /*
            * Build
            * params: Extraction Object
            * returns: Formatted & Purified Article Object - URL, Title, Description, Image, Content
            * */

            build: function(extractionObj){
                var self = this;
                var deferred = $q.defer();

                //Create local copy of Extraction Object
                extractionObject = extractionObj;

                //Extract OpenGraph Data
                OrionOpenGraphExtractor.get(extractionObject.url)
                    .then(function(openGraphData){

                        //Extract Article URL Data
                        OrionArticleUrlExtractor.extractArticleUrl(extractionObject)
                            .then(function(content){

                                //Create local copies of extracted data
                                openGraph = openGraphData;
                                articleContent = content;

                                deferred.resolve(self.buildArticle());
                            })
                            .catch(function(err){deferred.reject(err)});
                    })
                    .catch(function(err){deferred.reject()});

                return deferred.promise;
            },

            /*
             * Article Builder
             *
             * returns - Formatted Article Object or false if article is invalid
             * */

            buildArticle: function(){
                var self = this;
                var articleObject = {
                    url: extractionObject.url,
                    title: self.processTitle(),
                    description: self.processDescription(),
                    image: self.processImage(),
                    content: self.processContent()
                };

                if(articleObject.title && articleObject.content){
                    return articleObject;
                }else{
                    return false;
                }
            },


            /*
            * Data Processors
            *
            * returns - Formatted pieces of data according to source OpenGraph config
            * */

            processTitle: function(){
                var i = 0;
                var title = '';
                var titleFound = false;

                //Loop through alternatives
                while(i < sourceExtractionAlternatives.length && !titleFound){

                    //Extraction Object Alternative Prefix - facebookOpenGraph, ogioOpenGraph, ogioHybridGraph, ogioHtmlInferred
                    var extractionObjectPrefix = extractionObject.source.extraction.openGraph.title[sourceExtractionAlternatives[i]];

                    //Make sure required values are available
                    if(openGraph[extractionObjectPrefix] != undefined &&
                        openGraph[extractionObjectPrefix].title != undefined){

                        var purifiedTitle =
                            OrionDataPurifier.purify(openGraph[extractionObjectPrefix].title);

                        //If OpenGraph data serves, purify title and interrupt loop
                        title = purifiedTitle;
                        titleFound = true;
                    }else{
                        title = false;
                    }
                    ++i;
                }

                return title;
            },

            processDescription: function(){
                var i = 0;
                var description = '';
                var descriptionFound = false;

                //Loop through alternatives
                while(i < sourceExtractionAlternatives.length && !descriptionFound){

                    //Extraction Object Alternative Prefix - facebookOpenGraph, ogioOpenGraph, ogioHybridGraph, ogioHtmlInferred
                    var extractionObjectPrefix = extractionObject.source.extraction.openGraph.description[sourceExtractionAlternatives[i]];

                    //Make sure required values are available
                    if(openGraph[extractionObjectPrefix] != undefined &&
                        openGraph[extractionObjectPrefix].description != undefined){
                        var purifiedDescription =
                            OrionDataPurifier.purify(openGraph[extractionObjectPrefix].description);

                        //If OpenGraph data serves, purify description and interrupt loop
                        description = purifiedDescription;
                        descriptionFound = true;
                    }else{
                        description = false;
                    }
                    ++i;
                }

                return description;
            },

            processImage: function(){
                var i = 0;
                var image = '';
                var imageFound = false;

                //Loop through alternatives
                while(i < sourceExtractionAlternatives.length && !imageFound){

                    //Extraction Object Alternative Prefix - facebookOpenGraph, ogioOpenGraph, ogioHybridGraph, ogioHtmlInferred
                    var extractionObjectPrefix = extractionObject.source.extraction.openGraph.image[sourceExtractionAlternatives[i]];

                    //Make sure required values are available
                    if(openGraph[extractionObjectPrefix] != undefined &&
                        openGraph[extractionObjectPrefix].image != undefined){
                        //If OpenGraph data serves, purify image and interrupt loop
                        image = openGraph[extractionObjectPrefix].image;
                        imageFound = true;
                    }else{
                        image = false;
                    }
                    ++i;
                }

                return image;
            },


            processContent: function(){
                return OrionDataPurifier.purify(articleContent);
            }
        }
    }]);