app.controller("ToastCtrl",["$scope","$mdToast",function(t,o){t.closeToast=function(){o.hide(),t.toastText="",t.toastTheme=""}}]).factory("Message",["$mdToast",function(t){return{toast:function(o){t.show({hideDelay:4500,position:"top right",controller:"ToastCtrl",template:'<md-toast><div class="md-toast-content '+o.theme+'"><span class="md-toast-text" flex>'+o.text+'</span><md-button ng-click="closeToast()" class="md-icon-button"><md-icon aria-label="close" class="material-icons step">close</md-icon></md-button></div></md-toast>'})}}}]);