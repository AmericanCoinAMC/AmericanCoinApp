app.directive("ignoreSwitch",["$rootScope",function(e){return{restrict:"E",scope:{source:"="},templateUrl:"/core/common/Source/ignoreSwitch.html",link:function(r,o,c){r.userIgnoredSources=e.userIgnoredSources,r.$watch("userIgnoredSources.isIgnored(source)",function(e,o){void 0!=e&&(r.isIgnored=!e)},!0),r.toggleSource=function(){r.userIgnoredSources.isIgnored(r.source)?r.userIgnoredSources.unignoreSource(r.source):r.userIgnoredSources.ignoreSource(r.source)}}}}]);