"use strict";var SourceExtraction=function(r){var e=this;e.source=r,e.db=new Database({refs:{primary:"sources/extraction/"+e.source.$key||e.source.key},schema:{primary:{openGraph:{value:"="},article:{value:"="},categoryUrls:{value:"="}}}})};SourceExtraction.prototype.save=function(r){var e=this;return new Promise(function(t,a){var c=e.db.ref.root.child(e.db.ref.primary);c.set(e.db.schema.build(r,"primary")).then(function(){t(!0)}).catch(function(r){a(r)})})};