/**
 * Created by Computadora on 23-Dec-16.
 */
/**
 * Created by Computadora on 12-Dec-16.
 */

app.factory('InstanceManager',
    ['DI01', 'DI02', 'DI03', 'SI01', 'TI01', '$q', '$rootScope',
        function(DI01, DI02, DI03, SI01, TI01, $q, $rootScope){

            return {
                getInstance: function(type){
                    var availableInstance;
                    switch(type){
                        case 'dynamic':
                            if(DI01.isAvailable()){
                                availableInstance = DI01;
                            }else if(DI02.isAvailable()){
                                availableInstance = DI02;
                            }else{
                                availableInstance = DI03;
                            }
                            break;
                        case 'static':
                            availableInstance = SI01;
                            break;
                        case 'temporary':
                            $rootScope.$broadcast('temporaryInstanceAssigned');
                            availableInstance = TI01;
                            break;
                        default:
                            break;
                    }
                    return availableInstance;
                }
            }
        }]);