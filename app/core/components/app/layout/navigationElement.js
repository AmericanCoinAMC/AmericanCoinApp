app.directive("navigationElement",["$rootScope","$stateParams",function(e,t){return{restrict:"A",scope:{views:"=",active:"=",customCondition:"="},link:function(o,a,i){o.stateParams=t,o.currentState=e.currentState,o.theme=e.userInfo.preferences.theme,o.navItem={},o.valid=!1,o.handleViewsActive=function(){for(var t=!1,i=0;i<o.views.length;i++)e.toState.name==o.views[i]&&(t=!0);t?(a.addClass("color-"+o.theme),o.valid=!0):(a.removeClass("color-"+o.theme),o.valid=!1)},o.handleCustomCondition=function(){o.customCondition?(a.addClass("color-"+o.theme),o.valid=!0):(a.removeClass("color-"+o.theme),o.valid=!1)},o.init=function(){for(var e=0;e<o.active.length;e++)if("addClass"in o.active[e])for(var t=0;t<o.active[e].addClass.length;t++)"views-active"==o.active[e].addClass[t]&&o.handleViewsActive(),"custom-condition"==o.active[e].addClass[t]&&o.handleCustomCondition()},o.init(),e.$on("$stateChangeStart",function(e,t,a,i,n,s){o.init()}),e.$watch("userInfo.preferences.theme",function(e,t){void 0!=e&&(o.valid&&(a.removeClass("color-"+t),a.addClass("color-"+e)),o.theme=e)},!0),o.$watch("customCondition",function(e,t){void 0!=e&&(o.customCondition=e,o.valid=e,e?a.addClass("color-"+o.theme):a.removeClass("color-"+o.theme))},!0)}}}]);