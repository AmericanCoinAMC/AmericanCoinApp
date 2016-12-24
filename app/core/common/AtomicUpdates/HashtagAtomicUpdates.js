app.factory("HashtagAtomicUpdates",["$q","PostObjectService","HashtagObjectService",function(t,s,e){return{updateHashtag:function(s){var e=t.defer();return this.getPostsArray(s).then(angular.bind(this,function(t){this.getUserHashtagRefs(s).then(angular.bind(this,function(a){this.getUserPostRefs(s).then(angular.bind(this,function(r){var o={mainPostRefs:this.getMainPostRefs(t,s),sourcePostRefs:this.getSourcePostRefs(t,s),categoryPostRefs:this.getCategoryPostRefs(t,s),hashtagPostRefs:this.getHashtagPostRefs(t,s),leaderPostRefs:this.getLeaderPostRefs(t,s),outstandingPostRefs:this.getOutstandingPostRefs(t,s),userPostRefs:r,userHashtagRefs:a},i=this.buildFanoutObject(s,o,"edit");rootRef.update(i).then(function(){e.resolve(!0)}).catch(function(t){e.reject(t)})})).catch(function(t){e.reject(t)})})).catch(function(t){e.reject(t)})})).catch(function(t){e.reject(t)}),e.promise},deleteHashtag:function(s){var e=t.defer();return this.getPostsArray(s).then(angular.bind(this,function(t){this.getUserHashtagRefs(s).then(angular.bind(this,function(a){this.getUserPostRefs(s).then(angular.bind(this,function(r){var o={mainPostRefs:this.getMainPostRefs(t,s),sourcePostRefs:this.getSourcePostRefs(t,s),categoryPostRefs:this.getCategoryPostRefs(t,s),hashtagPostRefs:this.getHashtagPostRefsDel(s),leaderPostRefs:this.getLeaderPostRefs(t,s),outstandingPostRefs:this.getOutstandingPostRefs(t,s),userPostRefs:r,userHashtagRefs:a},i=this.buildFanoutObject(s,o,"delete");rootRef.update(i).then(function(){e.resolve(!0)}).catch(function(t){e.reject(t)})})).catch(function(t){e.reject(t)})})).catch(function(t){e.reject(t)})})).catch(function(t){e.reject(t)}),e.promise},buildFanoutObject:function(t,s,a){var r={},o={};"edit"==a&&(o=e.buildMinifiedAlt(t));for(var i=s.mainPostRefs,n=0;n<i.length;n++)r[i[n]]=o;for(var h=s.sourcePostRefs,n=0;n<h.length;n++)r[h[n]]=o;for(var d=s.categoryPostRefs,n=0;n<d.length;n++)r[d[n]]=o;for(var g=s.hashtagPostRefs,n=0;n<g.length;n++)r[g[n]]=o;for(var c=s.leaderPostRefs,n=0;n<c.length;n++)r[c[n]]=o;for(var f=s.outstandingPostRefs,n=0;n<f.length;n++)r[f[n]]=o;for(var u=s.userPostRefs,n=0;n<u.length;n++)r[u[n]]=o;for(var P=s.userHashtagRefs,n=0;n<P.length;n++)r[P[n]]=o;return r},getPostsArray:function(e){var a=t.defer(),r=rootRef.child("hashtagPosts/"+e.$id),o=[];return r.once("value").then(function(t){t.forEach(function(t){o.push(s.buildFromSnapshot(t))}),a.resolve(o)}),a.promise},getMainPostRefs:function(t,s){for(var e=[],a=0;a<t.length;a++)t[a].primaryHashtag.id==s.$id&&e.push("/posts/"+t[a].$id+"/primaryHashtag"),void 0!=t[a].secondaryHashtags&&s.$id in t[a].secondaryHashtags&&e.push("/posts/"+t[a].$id+"/secondaryHashtags/"+s.$id);return e},getSourcePostRefs:function(t,s){for(var e=[],a=0;a<t.length;a++)t[a].primaryHashtag.id==s.$id&&e.push("/sourcePosts/"+t[a].source.id+"/"+t[a].category.id+"/"+t[a].$id+"/primaryHashtag"),void 0!=t[a].secondaryHashtags&&s.$id in t[a].secondaryHashtags&&e.push("/sourcePosts/"+t[a].source.id+"/"+t[a].category.id+"/"+t[a].$id+"/secondaryHashtags/"+s.$id);return e},getCategoryPostRefs:function(t,s){for(var e=[],a=0;a<t.length;a++)t[a].primaryHashtag.id==s.$id&&e.push("/categoryPosts/"+t[a].category.id+"/"+t[a].$id+"/primaryHashtag"),void 0!=t[a].secondaryHashtags&&s.$id in t[a].secondaryHashtags&&e.push("/categoryPosts/"+t[a].category.id+"/"+t[a].$id+"/secondaryHashtags/"+s.$id);return e},getHashtagPostRefs:function(t,s){for(var e=[],a=0;a<t.length;a++)t[a].primaryHashtag.id==s.$id&&e.push("/hashtagPosts/"+s.$id+"/"+t[a].$id+"/primaryHashtag"),void 0!=t[a].secondaryHashtags&&s.$id in t[a].secondaryHashtags&&e.push("/hashtagPosts/"+s.$id+"/"+t[a].$id+"/secondaryHashtags/"+s.$id);return e},getLeaderPostRefs:function(t,s){for(var e=[],a=0;a<t.length;a++)void 0!=t[a].leaders&&angular.forEach(t[a].leaders,function(r){t[a].primaryHashtag.id==s.$id&&e.push("/leaderPosts/"+r.id+"/"+t[a].$id+"/primaryHashtag"),void 0!=t[a].secondaryHashtags&&s.$id in t[a].secondaryHashtags&&e.push("/leaderPosts/"+r.id+"/"+t[a].$id+"/secondaryHashtags/"+s.$id)});return e},getHashtagPostRefsDel:function(t){return["/hashtagPosts/"+t.$id]},getOutstandingPostRefs:function(t,s){for(var e=[],a=0;a<t.length;a++)t[a].outstanding&&(t[a].primaryHashtag.id==s.$id&&e.push("/outstandingPosts/"+t[a].$id+"/primaryHashtag"),void 0!=t[a].secondaryHashtags&&s.$id in t[a].secondaryHashtags&&e.push("/outstandingPosts/"+t[a].$id+"/secondaryHashtags/"+s.$id));return e},getUserPostRefs:function(s){var e=t.defer(),a=rootRef.child("userPosts"),r=[];return a.once("value").then(function(t){t.forEach(function(t){t.forEach(function(e){e.val().primaryHashtag.id==s.$id&&r.push("/userPosts/"+t.key+"/"+e.key+"/primaryHashtag"),void 0!=e.val().secondaryHashtags&&s.$id in e.val().secondaryHashtags&&r.push("/userPosts/"+t.key+"/"+e.key+"/secondaryHashtags/"+s.$id)})}),e.resolve(r)}),e.promise},getUserHashtagRefs:function(s){var e=t.defer(),a=rootRef.child("userHashtags"),r=[];return a.once("value").then(function(t){t.forEach(function(t){t.forEach(function(e){e.key==s.$id&&r.push("/userHashtags/"+t.key+"/"+s.$id)})}),e.resolve(r)}),e.promise}}}]);