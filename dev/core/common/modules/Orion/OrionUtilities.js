/**
 * Created by Computadora on 04-Feb-17.
 */

app.factory('OrionUtilities', ['$q', '$rootScope', function($q, $rootScope){
    return{

        buildExtractionObject: function(){
            //Init
            var self = this;
            var deferred = $q.defer();

            var sourceClass = new Source();
            var categoryClass = new Category();

            var categoriesObject = {};
            var sourcesObject = {};

            //Retrieve Categories Data
            var categoriesRef = sourceClass.db.ref.root.child('categories');
            categoriesRef.once("value").then(function(categoriesSnapshot){

                //Build Category Object
                categoriesSnapshot.forEach(function(categorySnapshot){
                    categoriesObject[categorySnapshot.key] = categoryClass.db.schema.build(categorySnapshot, 'snapshot')
                });


                //Retrieve Active Sources Only
                var sourcesRef = sourceClass.db.ref.root.child('sources/information').orderByChild('status/active').equalTo(true);
                sourcesRef.once("value").then(function(sourcesInformationSnapshot){

                    //Loop through each source information node
                    sourcesInformationSnapshot.forEach(function(sourceInformationSnapshot){

                        //Retrieve Source Extraction Data
                        var sourceExtractionRef = sourceClass.db.ref.root.child('sources/extraction/' + sourceInformationSnapshot.key);
                        sourceExtractionRef.once("value").then(function(sourceExtractionSnapshot){

                            //Retrieve Source Assignments Data
                            var sourceAssignmentsRef = sourceClass.db.ref.root.child('sources/assignments/' + sourceInformationSnapshot.key);
                            sourceAssignmentsRef.once("value").then(function(sourceAssignmentsSnapshot){

                                //Retrieve Source Categories Data
                                var sourceCategoriesRef = sourceClass.db.ref.root.child('sources/categories/' + sourceInformationSnapshot.key);
                                sourceCategoriesRef.once("value").then(function(sourceCategoriesSnapshot){


                                    var source = sourceClass.db.schema.build(sourceInformationSnapshot, 'snapshot');

                                    sourcesObject[source.$key] = {};


                                    sourcesObject[source.$key].information = source;

                                    //Build Source Objects
                                    if(sourceExtractionSnapshot.exists()){
                                        sourcesObject[source.$key].extraction = sourceExtractionSnapshot.val();
                                    }else{
                                        sourcesObject[source.$key].extraction = false;
                                    }

                                    if(sourceAssignmentsSnapshot.exists()){
                                        sourcesObject[source.$key].assignments = sourceAssignmentsSnapshot.val();
                                    }else{
                                        sourcesObject[source.$key].assignments = false;
                                    }

                                    if(sourceCategoriesSnapshot.exists()){
                                        sourcesObject[source.$key].categories = sourceCategoriesSnapshot.val();
                                    }else{
                                        sourcesObject[source.$key].categories = false;
                                    }


                                }).catch(function(err){deferred.reject(err)});
                            }).catch(function(err){deferred.reject(err)});
                        }).catch(function(err){deferred.reject(err)});
                    });


                    //Resolve Extraction Object
                    deferred.resolve({
                        sources: sourcesObject,
                        categories: categoriesObject
                    });
                }).catch(function(err){deferred.reject(err)});
            }).catch(function(err){deferred.reject(err)});


            return deferred.promise;
        }




    }
}]);